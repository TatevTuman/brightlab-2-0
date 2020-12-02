import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { isoFormatDate } from '../tookan';
import createNotification from '../notifications/createNotification';
import { bookingUrl } from '../../bookings';
import { getAddressee } from '../../addresses';
import Tasks from '../../../api/Tasks/Tasks';
import handleCallback from './handleCallback';
import handleSms from './handleSms';

export default (request) => {
  const {
    body: {
      job_id: tookanJobId,
      arrived_datetime: arrivedDateTime,
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
    arrived: taskArrived,
    successful: taskSuccessful,
    failed: taskFailed,
  } = Meteor.settings.public.tasks.status;

  let arrivedAt = isoFormatDate(arrivedDateTime);

  // Webhook notifications do not always arrived in sequential order. To mitigate this, tasks with a
  // status of "successful" or "failed" can be set to "arrived" only if the request time is later
  // than the time of the previous task update.
  if (
    tookanUpdatedAt &&
    [taskSuccessful, taskFailed].indexOf(taskStatus) >= 0 &&
    (!arrivedAt || moment(arrivedAt).isBefore(tookanUpdatedAt))
  )
    return;

  const isoDate = new Date().toISOString();
  const arrivedLocation = [fleetLatitude, fleetLongitude];

  if (!arrivedAt) arrivedAt = isoDate;

  console.log(`Updating status of task ${taskId} to ${taskArrived} at ${arrivedAt}.`);

  // Update task status
  Tasks.update(
    { tookanJobId },
    {
      $set: {
        status: taskArrived,
        arrivedAt,
        arrivedLocation,
        updatedAt: isoDate,
        tookanUpdatedAt: arrivedAt,
      },
    },
  );

  // Send push notification
  createNotification(
    taskOwner,
    getAddressee(taskAddressId),
    'The rider has arrived.',
    bookingUrl(taskBookingId),
  );

  handleCallback(tookanJobId, fleetLatitude, fleetLongitude, 'arrived', arrivedAt);
  handleSms(task._id, 'arrived', arrivedAt);
};
