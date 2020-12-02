import 'moment-duration-format';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { HTTP } from 'meteor/http';
import { sprintf } from 'sprintf-js';
import { capitalizeFirstLetter } from 'apollo-client/util/capitalizeFirstLetter';
import { distanceAsCrowFlies } from '../../geo';
import getUserSetting from '../../getUserSetting';
import { getCustomField, isoFormatDate } from '../tookan';
import { canSaveTaskWaiting, sendTaskSuccessfulEmail } from '../tasks';
import maybeSaveWaiting from '../addresses/maybeSaveWaiting';
import maybeCompleteBooking from '../bookings/maybeCompleteBooking';
import createNotification from '../notifications/createNotification';
import { bookingUrl } from '../../bookings';
import { getAddressee } from '../../addresses';
import Tasks from '../../../api/Tasks/Tasks';
import Addresses from '../../../api/Addresses/Addresses';
import Bookings from '../../../api/Bookings/Bookings';
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
      custom_fields: customFields,
      task_history: taskHistory,
    },
  } = request;

  // Find task from job ID
  const task = Tasks.findOne({ tookanJobId });

  if (!task) return;

  // Get task data
  const {
    _id: taskId,
    status: initialStatus,
    bookingId,
    owner,
    start,
    addressId,
    expectedWait,
    startedAt,
    arrivedAt,
    arrivedLocation,
    type,
  } = task;

  const {
    public: {
      tasks: {
        status: { successful: taskSuccessful },
      },
    },
    private: {
      booking: {
        services,
        waiting: { proximityThreshold },
      },
    },
  } = Meteor.settings;

  let completedAt = isoFormatDate(completedDateTime);
  const tookanStartedAt = isoFormatDate(startedDateTime);
  const tookanArrivedAt = isoFormatDate(arrivedDateTime);

  const isoDate = new Date().toISOString();
  const completedLocation = [fleetLatitude, fleetLongitude];

  if (!completedAt) completedAt = isoDate;

  const variables = {
    status: taskSuccessful,
    completedAt,
    completedLocation,
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

  // Update load if necessary
  const load = getCustomField('Load', customFields);
  const podName = getCustomField('Name', customFields);
  const podNotes = getCustomField('Notes', customFields);
  const podImage = getCustomField('Image', customFields);

  if (load && load !== task.load) variables.load = load / 100;

  if (podName) variables.podName = podName;
  if (podNotes) variables.podNotes = podNotes;
  if (podImage) variables.podImage = podImage;

  console.log(`Updating status of task ${taskId} to ${taskSuccessful} at ${completedAt}.`);

  // Update task status
  Tasks.update(
    { _id: task._id },
    {
      $set: variables,
    },
  );

  const taskUser = Meteor.users.findOne({ _id: owner });

  const {
    payment: { pricingModels: pricingModelIds },
  } = taskUser;

  // Get booking data
  const booking = Bookings.findOne({ _id: bookingId });
  const { priceDiff, service, isHotBox } = booking;

  // Get waiting price per minute
  let {
    price: { waiting: waitingPricePerMin },
  } = services[service];

  // Check pricing model
  let pricingModel = null;

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

  // Apply differential
  if (priceDiff && priceDiff > 0) {
    waitingPricePerMin *= priceDiff;
  }

  // Get waiting time difference
  let waitingDiffTime = false;
  let waitingDiffAmount = false;
  let waitingDiffSeconds = 0;

  if (variables.waiting && expectedWait && variables.waiting !== expectedWait) {
    waitingDiffSeconds = expectedWait - variables.waiting;

    const waitingDiffSecondsAbs = Math.abs(waitingDiffSeconds);
    const waitingDuration = moment.duration(waitingDiffSecondsAbs, 's');
    const hours = waitingDuration.hours();
    const minutes = waitingDuration.minutes();
    const seconds = waitingDuration.seconds();

    if (waitingDiffSecondsAbs >= 3600) {
      waitingDiffTime = sprintf(
        '%d hour%s%s%s%s%s',
        hours,
        hours > 1 ? 's' : '',
        minutes ? ' ' : '',
        minutes ? minutes.toString() : '',
        minutes ? ' minute' : '',
        minutes && minutes > 1 ? 's' : '',
      );
    } else if (waitingDiffSecondsAbs >= 60) {
      waitingDiffTime = sprintf(
        '%d minute%s%s%s%s%s',
        minutes,
        minutes > 1 ? 's' : '',
        seconds ? ' ' : '',
        seconds ? seconds.toString() : '',
        seconds ? ' second' : '',
        seconds && seconds > 1 ? 's' : '',
      );
    } else {
      waitingDiffTime = sprintf(
        '%d second%s',
        waitingDuration.seconds(),
        waitingDuration.seconds() > 1 ? 's' : '',
      );
    }

    // Calculate price difference
    const taskWaitingPrice =
      Math.round(((waitingPricePerMin * waitingDiffSecondsAbs) / 60) * 100) / 100;

    waitingDiffAmount = `£${taskWaitingPrice.toFixed(2)}`;

    // Update task waiting price
    Tasks.update(
      { _id: task._id },
      {
        $set: {
          waitingPrice: waitingDiffSeconds < 0 ? taskWaitingPrice : -taskWaitingPrice,
        },
      },
    );
  }

  // Maybe send task completion email
  const isTaskCompletedEmails = JSON.parse(getUserSetting('taskCompletedEmails', true, owner));
  const isTaskStatusChanged = initialStatus !== taskSuccessful;

  if (isTaskCompletedEmails && isTaskStatusChanged) {
    sendTaskSuccessfulEmail(
      customFields,
      taskHistory,
      pricingModel,
      waitingDiffSeconds,
      waitingDiffTime,
      waitingDiffAmount,
      completedAtMoment,
      taskUser,
      task,
      address,
    );
  }

  // Send push notification
  createNotification(
    owner,
    getAddressee(addressId),
    capitalizeFirstLetter(`${type} ${taskSuccessful}`),
    bookingUrl(bookingId),
  );

  // Set booking hot box
  const hotBoxField = customFields.find((field) => field.label === 'Thermal_Box_£5');
  const hotBox = hotBoxField && hotBoxField.fleet_data;
  if (!isHotBox && hotBox) Bookings.update(bookingId, { $set: { isHotBox: true } });

  // Maybe complete booking
  maybeCompleteBooking(booking, taskUser, pricingModel, 'successful');

  handleCallback(tookanJobId, fleetLatitude, fleetLongitude, 'successful', completedAt);
  handleSms(task._id, `successful`, completedAt);
};
