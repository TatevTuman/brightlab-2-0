/* eslint-disable import/prefer-default-export */

import { Meteor } from 'meteor/meteor';

export const agentPayRate = (label) => {
  const { areas } = Meteor.settings.private.agent.payRate;
  const rate = label || areas[0].label;

  return areas.find((option) => option.label === rate);
};
