import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { capitalizeFirstLetter } from 'apollo-client/util/capitalizeFirstLetter';
import { isoFormatDate } from '../tookan';
import { distanceAsCrowFlies } from '../../geo';
import getUserSetting from '../../getUserSetting';
import { canSaveTaskWaiting, sendTaskFailedEmail } from '../tasks';
import maybeCompleteBooking from '../bookings/maybeCompleteBooking';
import maybeSaveWaiting from '../addresses/maybeSaveWaiting';
import createNotification from '../notifications/createNotification';
import { bookingUrl } from '../../bookings';
import { getAddressee } from '../../addresses';
import Bookings from '../../../api/Bookings/Bookings';
import Tasks from '../../../api/Tasks/Tasks';
import Addresses from '../../../api/Addresses/Addresses';
import PricingModels from '../../../api/PricingModels/PricingModels';
import handleCallback from './handleCallback';
import handleSms from './handleSms';

export default (request) => {
  const {
    body: {
      job_id: tookanJobId,
      completed_datetime: completedDateTime,
      started_datetime: startedDateTime,
      arrived_datetime: arrivedDateTime,
      fleet_latitude: fleetLatitude,
      fleet_longitude: fleetLongitude,
      task_history: taskHistory,
      custom_fields: customFields,
    },
  } = request;

  // Find task from job ID
  const task = Tasks.findOne({ tookanJobId });

  let completedAt = isoFormatDate(completedDateTime);
  const tookanStartedAt = isoFormatDate(startedDateTime);
  const tookanArrivedAt = isoFormatDate(arrivedDateTime);

  if (!task) return;

  const {
    _id: taskId,
    bookingId,
    owner,
    start,
    addressId,
    arrivedLocation,
    startedAt,
    arrivedAt,
    expectedWait,
    type,
  } = task;

  const {
    public: {
      tasks: {
        status: { failed: taskFailed },
      },
    },
    private: {
      booking: {
        services,
        waiting: { proximityThreshold },
      },
    },
  } = Meteor.settings;

  const isoDate = new Date().toISOString();
  const completedLocation = [fleetLatitude, fleetLongitude];

  if (!completedAt) completedAt = isoDate;

  const variables = {
    status: taskFailed,
    completedLocation,
    completedAt,
    startedAt: startedAt || tookanStartedAt,
    arrivedAt: arrivedAt || tookanArrivedAt,
    updatedAt: isoDate,
    tookanUpdatedAt: completedAt,
  };

  // Get current address data before updating waiting time data
  const address = Addresses.findOne({ _id: addressId });
  const startMoment = start && moment(start);
  const completedAtMoment = completedAt && moment(completedAt);

  if (canSaveTaskWaiting(task, completedAtMoment, completedLocation)) {
    const [arrivedLat, arrivedLng] = arrivedLocation;
    const [completedLat, completedLng] = completedLocation;

    // Check distance between arrival and completed locations
    const proximity = distanceAsCrowFlies(arrivedLat, arrivedLng, completedLat, completedLng);

    // Distance between locations is inside proximity threshold
    if (proximity <= proximityThreshold) {
      const useArrivedAt = moment.max(startMoment, moment(arrivedAt));
      const waitingTime = completedAtMoment.diff(useArrivedAt, 's');

      // Save waiting time to task
      variables.waiting = Math.max(waitingTime, 0);

      maybeSaveWaiting(address, variables.waiting);
    }
  }

  console.log(`Updating status of task ${taskId} to ${taskFailed} at ${completedAt}.`);

  // Update task status
  Tasks.update(
    { _id: taskId },
    {
      $set: variables,
    },
  );

  const taskUser = Meteor.users.findOne({ _id: owner });

  const {
    payment: { pricingModels: pricingModelIds },
  } = taskUser;

  const booking = Bookings.findOne({ _id: bookingId });
  const { priceDiff, service, isHotBox } = booking;

  // Get waiting price per minute
  let {
    price: { waiting: waitingPricePerMin },
  } = services[service];

  let pricingModel = null;

  // Check pricing model
  if (pricingModelIds && pricingModelIds.length) {
    pricingModel = PricingModels.findOne({
      _id: {
        $in: pricingModelIds,
      },
      service,
    });

    if (pricingModel) {
      if (pricingModel.waiting) {
        waitingPricePerMin = pricingModel.waiting;
      }
    }
  }

  // Apply price differential
  if (priceDiff && priceDiff > 0) {
    waitingPricePerMin *= priceDiff;
  }

  // Get waiting time difference
  let waitingDiffSeconds = 0;

  if (variables.waiting && expectedWait && variables.waiting !== expectedWait) {
    waitingDiffSeconds = expectedWait - variables.waiting;

    const waitingDiffSecondsAbs = Math.abs(waitingDiffSeconds);

    // Calculate price difference
    const taskWaitingPrice =
      Math.round(((waitingPricePerMin * waitingDiffSecondsAbs) / 60) * 100) / 100;

    // Update task waiting price
    Tasks.update(
      { _id: taskId },
      {
        $set: {
          waitingPrice: waitingDiffSeconds < 0 ? taskWaitingPrice : -taskWaitingPrice,
        },
      },
    );
  }

  // Maybe send task completion email
  if (JSON.parse(getUserSetting('taskFailedEmails', true, owner))) {
    sendTaskFailedEmail(taskHistory, completedAtMoment, taskUser, task, address);
  }

  // Send push notification
  createNotification(
    owner,
    getAddressee(addressId),
    capitalizeFirstLetter(`${type} ${taskFailed}`),
    bookingUrl(bookingId),
  );

  // Set booking hot box
  const hotBoxField = customFields.find((field) => field.label === 'Thermal_Box_£5');
  const hotBox = hotBoxField && hotBoxField.fleet_data;
  if (!isHotBox && hotBox) Bookings.update(bookingId, { $set: { isHotBox: true } });

  // Maybe complete booking
  maybeCompleteBooking(booking, taskUser, pricingModel, 'failed');

  handleCallback(tookanJobId, fleetLatitude, fleetLongitude, 'failed', completedAt);
  handleSms(taskId, `failed`, completedAt);
};
