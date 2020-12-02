import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

const {
  analytics: {
    google: { trackingId },
  },
} = Meteor.settings.public;

let a = null;

const analytics = {
  identify: (userId, traits) => {
    if (!Roles.userIsInRole(userId, 'admin')) {
      a = Analytics({
        debug: Meteor.isDevelopment,
        plugins: [
          googleAnalytics({
            trackingId,
          }),
        ],
      });

      a.identify(userId, traits);
    }
  },
  page: (data, options, callback) => a && a.page(data, options, callback),
  track: (eventName, payload, options, callback) =>
    a && a.track(eventName, payload, options, callback),
};

export default analytics;
