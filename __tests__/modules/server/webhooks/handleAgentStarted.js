import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { isoFormatDate } from '../tookan';
import createNotification from '../notifications/createNotification';
import { bookingUrl } from '../../bookings';
import { getAddressee } from '../../addresses';
import Tasks from '../../../api/Tasks/Tasks';
import Bookings from '../../../api/Bookings/Bookings';
import handleCallback from './handleCallback';
import handleSms from './handleSms';

export default (request) => {
  const {
    body: {
      job_id: tookanJobId,
      started_datetime: startedDateTime,
      fleet_latitude: fleetLatitude,
      fleet_longitude: fleetLongitude,
    },
  } = request;

  // Find task from job ID
  const task = Tasks.findOne({ tookanJobId });

  if (!task) return;

  const {
    _id: taskId,
    status: taskStatus,
    bookingId: taskBookingId,
    addressId: taskAddressId,
    owner: taskOwner,
    tookanUpdatedAt,
  } = task;

  const {
    booking: {
      status: { started: bookingStarted },
    },
    tasks: {
      status: {
        started: taskStarted,
        arrived: taskArrived,
        successful: taskSuccessful,
        failed: taskFailed,
      },
    },
  } = Meteor.settings.public;

  let startedAt = isoFormatDate(startedDateTime);

  // Webhook notifications do not always arrived in sequential order. To mitigate this, tasks with a
  // status of "arrived", "successful" or "failed" can be set to "arrived" only if the request time
  // is later than the time of the previous task update.
  if (
    tookanUpdatedAt &&
    [taskArrived, taskSuccessful, taskFailed].indexOf(taskStatus) >= 0 &&
    (!startedAt || moment(startedAt).isBefore(tookanUpdatedAt))
  )
    return;

  const isoDate = new Date().toISOString();
  const startedLocation = [fleetLatitude, fleetLongitude];

  if (!startedAt) startedAt = isoDate;

  console.log(`Updating status of task ${taskId} to ${taskStarted} at ${startedAt}.`);

  // Update task status
  Tasks.update(
    { _id: taskId },
    {
      $set: {
        status: taskStarted,
        startedAt,
        startedLocation,
        updatedAt: isoDate,
        tookanUpdatedAt: startedAt,
      },
    },
  );

  // Get booking
  const booking = Bookings.findOne({ _id: taskBookingId });

  if (booking) {
    const { owner } = booking;
    const user = Meteor.users.findOne({ _id: owner });

    const {
      payment: { invoice },
    } = user;

    let reauthorisePayment = false;

    // Determine whether payment needs to be re-authorised. The payment will need to be
    // re-authorised either
    //    (i)  when the booking was made more than 7 days ago, or
    //    (ii) payment was not authorised at the time of booking (e.g. the customer's invoicing
    //         privileges could have been removed in the time between when the booking was made and
    //         "now".
    if (!invoice) {
      const { api } = booking;

      if (api && api.stripe) {
        const { id, status, updatedAt } = api.stripe;
        const { authorised } = Meteor.settings.public.stripe.status;

        if (!id || status !== authorised) {
          reauthorisePayment = true;
        } else {
          const sevenDaysAgo = moment().subtract(7, 'd');

          if (sevenDaysAgo.isAfter(moment(updatedAt))) {
            reauthorisePayment = true;
          }
        }
      } else {
        reauthorisePayment = true;
      }
    }

    if (reauthorisePayment) {
      Meteor.call('authoriseBookingPayment', taskBookingId, (err) => {
        if (err) {
          console.error(err.message);
        }
      });
    }
  }

  // Update booking status
  Bookings.update(
    { _id: taskBookingId },
    {
      $set: {
        status: bookingStarted,
        updatedAt: isoDate,
      },
    },
  );

  // Send push notification
  createNotification(
    taskOwner,
    getAddressee(taskAddressId),
    'The rider is on their way.',
    bookingUrl(taskBookingId),
  );

  handleCallback(tookanJobId, fleetLatitude, fleetLongitude, 'started', startedAt);
  handleSms(taskId, 'started', startedAt);
};
