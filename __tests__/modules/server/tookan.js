import { sprintf } from 'sprintf-js';
import moment from 'moment';
import 'moment-timezone';

export const checkRequest = (request) => {
  return request && request.body && request.body.job_id;
};

export const getCustomField = (label, fields) => {
  if (label && fields && fields.length) {
    const field = fields.find((f) => f.label === label);

    return field ? field.data : false;
  }

  return false;
};

export const getTaskHistory = (type, data) => {
  let history = [];

  if (type && data && data.length) {
    history = data.filter((d) => d.type === type);
  }

  return history;
};

export const isoFormatDate = (date) => {
  if (!date) return false;

  const regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/gm;
  const { length } = date;

  let fixedDate = date;

  if (length < 19) {
    fixedDate = sprintf('%s0%s', date.substr(0, length - 1), date[length - 1]);
  }

  const match = fixedDate.match(regex);

  if (match && match.length) {
    return moment(fixedDate).format('YYYY-MM-DDTHH:mm:ssZ');
    // .tz(Meteor.settings.private.timezone)
  }

  return fixedDate;
};
