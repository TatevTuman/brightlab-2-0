import { Meteor } from 'meteor/meteor';
import { callingCountries } from 'country-data';

export const dialCode2CountryCode = (dialCode) =>
  callingCountries.all.find(
    (callingCountry) => callingCountry.countryCallingCodes.indexOf(dialCode) >= 0,
  );

export const countryCode2DialCode = (countryCode) => {
  const country = callingCountries.all.find(
    (callingCountry) => callingCountry.alpha2.toLowerCase() === countryCode,
  );

  return country ? country.countryCallingCodes[0] : null;
};

export const splitPhoneNumber = (input) => {
  const formattedInput = input.replace(/\+|\s/g, '').trim();

  const { defaultCountryCode, ignoreCountryCodes } = Meteor.settings.private;
  const { all } = callingCountries;

  let phoneNumber = null;

  all.forEach((callingCountry) => {
    const { alpha2, countryCallingCodes } = callingCountry;
    const countryCode = alpha2.toLowerCase();

    if (ignoreCountryCodes.indexOf(countryCode) < 0) {
      countryCallingCodes.forEach((countryCallingCode) => {
        const dialCode = parseInt(countryCallingCode, 10).toString();

        if (formattedInput.indexOf(dialCode) === 0) {
          phoneNumber = {
            countryCode,
            number: formattedInput.split(dialCode).join(''),
          };
        }
      });
    }
  });

  if (!phoneNumber) {
    phoneNumber = { countryCode: defaultCountryCode };

    if (input[0] === '0') {
      phoneNumber.number = formattedInput.substring(1, formattedInput.length);
    } else {
      phoneNumber.number = formattedInput;
    }
  }

  return phoneNumber;
};

export const deg2rad = (deg) => deg * (Math.PI / 180);

export const distanceAsCrowFlies = (lat1, lng1, lat2, lng2) => {
  const R = 6371000; // Radius of the earth in m
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};
