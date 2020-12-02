import 'moment-timezone';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import sendEmail from './sendEmail';
import { getCustomField, getTaskHistory } from './tookan';

export const canSaveTaskWaiting = (task, completedAtMoment, completedLocation) => {
  const {
    status: { successful: taskSuccessful, failed: taskFailed },
  } = Meteor.settings.public.tasks;

  const { status, start, arrivedLocation, arrivedAt } = task;

  const startMoment = start && moment(start);

  return (
    status !== taskSuccessful &&
    status !== taskFailed &&
    arrivedAt &&
    arrivedLocation &&
    arrivedLocation.length === 2 &&
    completedLocation &&
    completedLocation.length === 2 &&
    startMoment &&
    completedAtMoment &&
    completedAtMoment.isAfter(startMoment)
  );
};

export const sendTaskSuccessfulEmail = (
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
) => {
  const {
    public: {
      productName,
      date: { format: dateFormat },
      tasks: {
        type: { pickup },
      },
    },
    private: {
      email: { support: supportEmail },
      timezone,
    },
  } = Meteor.settings;

  const {
    emails: [{ address: userEmail }],
    profile: {
      name: { first: userFirstName, last: userLastName },
    },
  } = taskUser;

  // Get recipient name
  const name = getCustomField('Name', customFields);

  // Get signature(s)
  const signatures = getTaskHistory('signature_image_added', taskHistory).map(
    (data) => data.description,
  );

  // Get image(s)
  let images = getCustomField('Images', customFields);

  if (images && typeof images === 'string') {
    images = JSON.parse(images);
  } else if (!images) {
    images = [];
  }

  // Get PDF(s)
  let pdfs = getCustomField('PDFs', customFields);

  if (pdfs && typeof pdfs === 'string') {
    pdfs = JSON.parse(pdfs);
  } else if (!pdfs) {
    pdfs = [];
  }

  let waitingDiffTimeNeg = false;
  let waitingDiffTimePos = false;

  // Only notify waiting time differences when
  //    (i) a custom pricing model doesn't exist, or
  //    (ii) the pricing model's distance parameter is not null.
  if (!pricingModel || pricingModel.distance) {
    if (waitingDiffSeconds > 0) {
      waitingDiffTimeNeg = waitingDiffTime;
    } else if (waitingDiffSeconds < 0) {
      waitingDiffTimePos = waitingDiffTime;
    }
  }

  const { type, bookingId, tracking } = task;
  const { address: addressAddress } = address;
  const completedAtLocal = completedAtMoment.tz(timezone);

  sendEmail({
    to: userEmail,
    from: supportEmail,
    subject: `Booking ${type} successful (${bookingId})`,
    template: 'task-successful',
    templateVars: {
      title: `Booking ${type} successful`,
      subtitle: addressAddress,
      taskType: type,
      isPickupTask: type === pickup,
      firstName: userFirstName,
      lastName: userLastName,
      date: completedAtLocal.format(dateFormat),
      time: completedAtLocal.format('HH:mm (z)'),
      address: addressAddress,
      waitingDiffTimeNeg,
      waitingDiffTimePos,
      waitingDiffAmount,
      productName,
      tracking,
      name,
      signatures,
      images,
      pdfs,
    },
  }).catch((emailErr) => {
    throw new Meteor.Error('send-email-error', emailErr.message);
  });
};

export const sendTaskFailedEmail = (taskHistory, completedAtMoment, taskUser, task, address) => {
  const {
    public: {
      productName,
      date: { format: dateFormat },
    },
    private: {
      email: { support: supportEmail },
      timezone,
    },
  } = Meteor.settings;

  const {
    emails: [{ address: userEmail }],
    profile: {
      name: { first: userFirstName },
    },
  } = taskUser;

  const { type, bookingId } = task;
  const { address: addressAddress } = address;
  const completedAtLocal = completedAtMoment.tz(timezone);

  let reason = null;

  if (taskHistory) {
    const stateChangeHistory = getTaskHistory('state_changed', taskHistory);

    if (stateChangeHistory) {
      const failedAtHistory = stateChangeHistory.filter(
        ({ description }) => description === 'Failed at',
      );

      if (failedAtHistory && failedAtHistory.length) {
        ({ reason } = failedAtHistory.pop());
      }
    }
  }

  sendEmail({
    to: userEmail,
    from: supportEmail,
    subject: `Booking ${type} failed (${bookingId})`,
    template: 'task-failed',
    templateVars: {
      title: `Booking ${type} failed`,
      subtitle: addressAddress,
      taskType: type,
      firstName: userFirstName,
      date: completedAtLocal.format(dateFormat),
      time: completedAtLocal.format('HH:mm (z)'),
      address: addressAddress,
      productName,
      reason,
    },
  }).catch((emailErr) => {
    throw new Meteor.Error('send-email-error', emailErr.message);
  });
};
