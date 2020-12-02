import { Meteor } from 'meteor/meteor';
import { countries } from 'country-data';
import { capitalizeFirstLetter } from 'apollo-client/util/capitalizeFirstLetter';
import Addresses from '../api/Addresses/Addresses';

export const getAddressee = (addressId) => {
  const address = Addresses.findOne(addressId);

  if (address) {
    const { contactName, contactCompany } = address;

    if (contactCompany && contactName) {
      return `${contactCompany} (${contactName})`;
    }
    if (contactName) {
      return contactName;
    }
  }

  return Meteor.settings.public.productName;
};

export const flatten = (input) => {
  const { address } = input;
  let output = '';

  if (address) output += address;

  return `${output}, United Kingdom`;
};

export const extractPostcode = (address) => {
  const match = address.match(/(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)/i);

  return match && match.length ? match[0] : null;
};

export const extractCountry = (address) => {
  let countryName = null;

  countries.all.forEach(({ name }) => {
    if (address.indexOf(name) >= 0) {
      countryName = name;
    }
  });

  return countryName;
};

export const extractStreetType = (address) => {
  const streetTypes = [];

  Meteor.settings.private.maxoptra.streetTypes.forEach(({ name, abbr }) => {
    const search = [name, ...abbr];

    search.forEach((term) => {
      const index = address.toLowerCase().indexOf(term);

      if (index > 0) {
        const before = address[index - 1];
        const after = address[index + term.length];

        if (before === ' ' && [' ', ','].indexOf(after) >= 0) {
          streetTypes.push(term);
        }
      }
    });
  });

  return streetTypes.length ? capitalizeFirstLetter(streetTypes.pop()) : null;
};

export const extractBuildingType = (address) => {
  let buildingType = null;

  Meteor.settings.private.maxoptra.buildingTypes.forEach(({ name, abbr }) => {
    const search = [name, ...abbr];

    search.forEach((term) => {
      const index = address.toLowerCase().indexOf(term);

      if (index > 0) {
        const before = address[index - 1];
        const after = address[index + term.length];

        if (before === ' ' && [' ', ','].indexOf(after) >= 0) {
          buildingType = capitalizeFirstLetter(term);
        }
      }
    });
  });

  return buildingType;
};

export const normalisePhoneNumber = (phoneNumber) => {
  let normalised = phoneNumber;

  if (normalised.slice(0, 2) === '07') {
    normalised = normalised.slice(1);
  }

  return normalised;
};

export const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.indexOf(0) === '0' ? phoneNumber : `0${phoneNumber}`;
};
