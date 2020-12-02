import { Meteor } from 'meteor/meteor';
import OneSignal from 'onesignal-node';

export default (userId, heading, content, url) => {
  const {
    public: {
      oneSignal: { appId },
    },
    private: {
      oneSignal: { key },
    },
  } = Meteor.settings;

  const user = Meteor.users.findOne(userId);

  if (user && user.api && user.api.onesignal) {
    const client = new OneSignal.Client(appId, key);
    const { id, subscribed } = user.api.onesignal;

    if (subscribed) {
      client
        .createNotification({
          url,
          headings: { en: heading },
          contents: { en: content },
          include_player_ids: [id],
        })
        .catch((err) => {
          console.error(err.statusCode, err.body);
        });
    }
  }
};
