import { Meteor } from 'meteor/meteor';

export const authorisePayment = (bookingId) => {
  Meteor.call('authoriseBookingPayment', bookingId, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};

export const capturePayment = (bookingId) => {
  Meteor.call('captureBookingPayment', bookingId, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};

export const authoriseAndCapturePayment = (bookingId) => {
  Meteor.call('authoriseBookingPayment', bookingId, true, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};

export const reauthoriseAndCapturePayment = (bookingId) => {
  Meteor.call('cancelBookingPayment', bookingId, () => {
    authoriseAndCapturePayment(bookingId);
  });
};

export const cancelPayment = (bookingId) => {
  Meteor.call('cancelBookingPayment', bookingId, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};
