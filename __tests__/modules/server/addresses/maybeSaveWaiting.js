import { Meteor } from 'meteor/meteor';
import Addresses from '../../../api/Addresses/Addresses';

export default (address, waiting) => {
  if (address && waiting > 0) {
    const { timeThreshold, maxRecords } = Meteor.settings.private.booking.waiting;

    // Assume waiting times less than or equal to 0 or greater than time threshold to be bogus
    if (waiting <= timeThreshold) {
      const { _id } = address;

      let { waiting: waitingRecords } = address;

      if (waitingRecords) {
        if (waitingRecords.length >= maxRecords) {
          waitingRecords.shift();
        }
      } else {
        waitingRecords = [];
      }

      waitingRecords.push(waiting);

      Addresses.update(
        { _id },
        {
          $set: { waiting: waitingRecords },
        },
      );
    }
  }
};
