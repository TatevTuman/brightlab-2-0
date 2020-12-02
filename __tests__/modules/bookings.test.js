/* eslint-disable meteor/no-session */

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import validator from 'validator';
import moment from 'moment';

const checkContact = (address) => {
  if (!address) return false;

  let valid = true;
  let { contactPhone } = address;

  if (contactPhone) {
    contactPhone = contactPhone.replace(/\s/g, '').trim();

    if (!validator.isNumeric(contactPhone) || contactPhone.length < 7 || contactPhone.length > 10) {
      valid = false;
    }
  }

  const { contactEmail } = address;

  if (contactEmail && !validator.isEmail(contactEmail)) {
    valid = false;
  }

  return valid;
};

export const serviceHours = (date) => {
  const { openDays } = Meteor.settings.public.booking;
  const day = moment(date || Session.get('datetime')).format('dddd');
  const hours = {};

  openDays.forEach(({ label, openingHour, closingHour }) => {
    if (label === day) {
      hours.openingHour = openingHour;
      hours.closingHour = closingHour;
    }
  });

  return hours;
};

export const checkDate = (booking) => {
  if (!booking) return false;

  const { date } = booking;

  if (!date) return false;

  const now = Session.get('datetime');

  const { openingHour } = serviceHours(date);
  const today = moment(now).set({
    hour: openingHour,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  return moment(date).isSameOrAfter(today);
};

export const checkExpired = (booking, tasks) => {
  if (!checkDate(booking)) return true;

  if (!tasks || !tasks.length) return true;

  const earliest = moment.min(
    tasks.map((task) => {
      const { start, end } = task;

      return moment.min(moment(start), moment(end));
    }),
  );

  const now = Session.get('datetime');

  return earliest.isBefore(moment(now));
};

export const checkAddresses = (booking) => {
  if (!booking) return false;

  const { pickups, dropoffs } = booking;
  const tasks = [...pickups, ...dropoffs];

  if (!tasks || !tasks.length) return false;

  let valid = true;

  tasks.forEach(({ addressId }) => {
    if (valid && !addressId) {
      valid = false;
    }
  });

  return valid;
};

export const checkPickups = (pickups) => {
  if (!pickups || !pickups.length) return false;

  let valid = true;

  pickups.forEach((pickup) => {
    const { addressId, start, end } = pickup;

    if (valid) {
      if (!addressId || !start || !end || !pickup.address) {
        valid = false;
      } else {
        valid = checkContact(pickup.address);
      }
    }
  });

  return valid;
};

export const checkBooking = (booking) => {
  if (!booking || !checkDate(booking)) return false;

  const { distance, duration, pickups, dropoffs, mode, service } = booking;
  // !price ||
  if (!service || distance < 0 || duration < 0) return false;

  const {
    profile: { phoneNumberStatus, phoneNumber },
  } = Meteor.user(); // TODO: should be booking owner

  const { approved } = Meteor.settings.public.twilio.status;

  if (phoneNumber && phoneNumberStatus !== approved) return false;

  let check = true;

  if (dropoffs && dropoffs.length) {
    dropoffs.forEach((dropoff) => {
      if (check) {
        if (
          !dropoff.start ||
          !dropoff.end ||
          (!dropoff.load && mode === 'dropoffs') ||
          !dropoff.address
        ) {
          check = false;
        } else {
          check = checkContact(dropoff.address);
        }
      }
    });
  }

  if (mode === 'pickups') {
    pickups.forEach((pickup) => {
      if (check) {
        if (!pickup.load) {
          check = false;
        }
      }
    });
  }

  return check;
};

export const closedDays = () => {
  const { openDays } = Meteor.settings.public.booking;
  const days = [];

  openDays.forEach(({ openingHour, closingHour }, index) => {
    if (!openingHour || !closingHour) {
      days.push(index);
    }
  });

  return days;
};

export const bookingService = (value) => {
  const { options } = Meteor.settings.public.booking.service;
  const service = value || options[0].value;

  return options.find((option) => option.value === service);
};

export const capitalise = (value, delimiter) => {
  const parts = value.split(delimiter);

  for (let i = 0, x = parts.length; i < x; i += 1) {
    if (parts[i] && parts[i][0].match(/[a-z]/)) {
      parts[i] = parts[i][0].toUpperCase() + parts[i].substr(1).toLowerCase();
    }
  }

  return parts.join(delimiter);
};

export const formatNameInput = (value) => {
  if (value) {
    return capitalise(capitalise(value.trim(), ' '), '-');
  }

  return value;
};

export const bookingUrl = (bookingId) =>
  `${Meteor.settings.public.rootUrl}/bookings/${bookingId}/edit`;
