import { Meteor } from 'meteor/meteor';
import Twilio from 'twilio';

export default (to, sms, log) =>
  new Promise((resolve, reject) => {
    const bound = Meteor.bindEnvironment((callback) => {
      callback();
    });

    if (!to) throw new Error('[sendSms]: to field is required');
    if (!sms) throw new Error('[sendSms]: sms body is required');

    const { sid, token } = Meteor.settings.private.twilio;
    const { productName } = Meteor.settings.public;

    const client = new Twilio(sid, token);

    client.messages
      .create({
        body: sms,
        from: productName,
        to,
      })
      .then(
        () => {
          console.log(`Sms to ${to} sent`);

          bound(() => {
            Meteor.call('logSms', log);
          });

          resolve(true);
        },
        (error) => {
          console.error(`Sms to ${to} failed`);

          bound(() => {
            Meteor.call('logSms', {
              ...log,
              status: 'admin failed',
              error: error.message || `ins't specified`,
            });
          });

          reject(error);
        },
      );
  });
