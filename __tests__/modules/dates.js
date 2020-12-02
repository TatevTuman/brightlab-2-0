/* eslint-disable meteor/no-session, no-constant-condition */

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import moment from 'moment';
import 'moment-timezone';

export const nextOpenDay = (openDays, closedDates, minNoticePeriod, datetime) => {
  const now = Session ? Session.get('datetime') : undefined;

  let threshold = moment(datetime || now).add(minNoticePeriod, 'm');
  let iteration = 0;

  while (closedDates.indexOf(threshold.format('YYYY-MM-DD')) >= 0) {
    threshold = threshold.add(1, 'd');

    if (iteration >= 7) {
      break;
    }

    iteration += 1;
  }

  const currentDay = threshold.format('dddd');

  let result = null;

  openDays.forEach(({ label, closingHour }, index) => {
    if (label === currentDay) {
      let shiftBy = index;

      if (threshold.hour() >= closingHour) {
        shiftBy += 1;
      }

      const shifted = [...openDays.slice(shiftBy, openDays.length), ...openDays.slice(0, shiftBy)];

      result = shifted.find((openDay) => openDay.openingHour && openDay.closingHour);
    }
  });

  return result;
};

export const nextOpenDayMoment = (openDays, closedDates, minNoticePeriod, datetime) => {
  const { label } = nextOpenDay(openDays, closedDates, minNoticePeriod, datetime)
  const now = Session ? Session.get('datetime') : undefined;
  const date = moment(datetime || now);

  let iteration = 0;

  while (true) {
    if (date.format('dddd') === label) {
      return date;
    }

    date.add(1, 'd');

    if (iteration >= 7) {
      break;
    }

    iteration += 1;
  }

  return null;
};

export const earliestDateTime = (nextOpenDate, openingHour, closingHour, minNoticePeriod) => {
  const now = Session.get('datetime');

  const dateTime = moment.max(
    moment(nextOpenDate)
      .add(minNoticePeriod, 'm')
      .hour(openingHour),
    moment(now).add(minNoticePeriod, 'm'),
  );

  return dateTime.format();
};

export const monthDayYear = (timestamp, timezone) =>
  !timezone
    ? moment(timestamp).format('MMMM Do, YYYY')
    : moment(timestamp)
        .tz(timezone)
        .format('MMMM Do, YYYY');

export const monthDayYearAtTime = (timestamp, timezone) =>
  !timezone
    ? moment(timestamp).format('MMMM Do, YYYY [at] hh:mm a')
    : moment(timestamp)
        .tz(timezone)
        .format('MMMM Do, YYYY [at] hh:mm a');

export const timeago = (timestamp, timezone) =>
  !timezone
    ? moment(timestamp).fromNow()
    : moment(timestamp)
        .tz(timezone)
        .fromNow();

export const add = (timestamp, amount, range, timezone) =>
  !timezone
    ? moment(timestamp)
        .add(amount, range)
        .format()
    : moment(timestamp)
        .tz(timezone)
        .add(amount, range)
        .format();

export const year = (timestamp, timezone) =>
  !timezone
    ? moment(timestamp).format('YYYY')
    : moment(timestamp)
        .tz(timezone)
        .format('YYYY');

export const iso = (timestamp, timezone) =>
  !timezone
    ? moment(timestamp).format()
    : moment(timestamp)
        .tz(timezone)
        .format();

/*eslint-disable */
export const round = (moment, precision, key, direction) => {
  direction = direction || 'round';

  const methods = {
    hours: { name: 'Hours', maxValue: 24 },
    minutes: { name: 'Minutes', maxValue: 60 },
    seconds: { name: 'Seconds', maxValue: 60 },
    milliseconds: { name: 'Milliseconds', maxValue: 1000 },
  };

  const keys = {
    mm: methods.milliseconds.name,
    milliseconds: methods.milliseconds.name,
    Milliseconds: methods.milliseconds.name,
    s: methods.seconds.name,
    seconds: methods.seconds.name,
    Seconds: methods.seconds.name,
    m: methods.minutes.name,
    minutes: methods.minutes.name,
    Minutes: methods.minutes.name,
    H: methods.hours.name,
    h: methods.hours.name,
    hours: methods.hours.name,
    Hours: methods.hours.name,
  };

  let value = 0;
  let rounded = false;
  let subRatio = 1;
  let maxValue;

  // make sure key is plural
  if (key.length > 1 && key !== 'mm' && key.slice(-1) !== 's') {
    key += 's';
  }
  key = keys[key].toLowerCase();

  // control
  if (!methods[key]) {
    throw new Error(
      'The value to round is not valid. Possibles ["hours", "minutes", "seconds", "milliseconds"]',
    );
  }

  const get = 'get' + methods[key].name;
  const set = 'set' + methods[key].name;

  for (const k in methods) {
    if (k === key) {
      value = moment._d[get]();
      maxValue = methods[k].maxValue;
      rounded = true;
    } else if (rounded) {
      subRatio *= methods[k].maxValue;
      value += moment._d[`get${methods[k].name}`]() / subRatio;
      moment._d[`set${methods[k].name}`](0);
    }
  }

  value = Math[direction](value / precision) * precision;
  value = Math.min(value, maxValue);
  moment._d[set](value);

  return moment;
};
/* eslint-enable */

export const normalise = (date) =>
  moment(date)
    // .tz(Meteor.settings.private.timezone)
    .format('YYYY-MM-DD HH:mm:ss');
