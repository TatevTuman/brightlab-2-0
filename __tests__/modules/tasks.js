/* eslint-disable import/prefer-default-export */

import { Meteor } from 'meteor/meteor';
import validator from 'validator';
import invert from 'lodash.invert';

export const checkPhone = (phone, countryCode) => {
  const phoneTrimmed = phone.replace(/\s/g, '').trim();

  return (
    !phoneTrimmed ||
    (countryCode &&
      validator.isNumeric(phoneTrimmed) &&
      phoneTrimmed.length > 6 &&
      phoneTrimmed.length <= 11)
  );
};

export const getStatusCode = (status) => {
  const { statusCodes } = Meteor.settings.private.tookan;

  return invert(statusCodes)[status];
};
