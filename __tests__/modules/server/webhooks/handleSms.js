import { Meteor } from 'meteor/meteor';
import sendSms from '../sendSms';
import Addresses from '../../../api/Addresses/Addresses';
import Tasks from '../../../api/Tasks/Tasks';
import { countryCode2DialCode } from '../../geo';

export default (taskId, status, datetime) => {
  const task = Tasks.findOne(taskId);

  if (task) {
    const { notifications, addressId, bookingId } = task;

    const isApiNotifications =
      notifications && notifications.gdprConsent && notifications.method === 'sms';

    if (isApiNotifications) {
      const address = Addresses.findOne(addressId);

      if (address && address.contactPhone && address.contactCountryCode) {
        const {
          contactEmail,
          contactName,
          contactCompany,
          contactCountryCode,
          contactPhone,
        } = address;

        let sms = null;
        let smsMessage = null;

        switch (status) {
          case 'started':
            smsMessage = 'delivery will be with you shortly';
            break;
          case 'arrived':
            smsMessage = 'delivery arrived';
            break;
          case 'failed':
            smsMessage = `delivery was failed at ${datetime}`;
            break;
          default:
            smsMessage = `delivery was successful at ${datetime}`;
            break;
        }

        if (isApiNotifications) {
          sms = `
            Hi ${contactName}, Your ${contactCompany || ''} ${smsMessage}. Thanks. PedalMe
          `;
        }

        const phoneNumberCountryCode = countryCode2DialCode(contactCountryCode);
        const phoneNumber = phoneNumberCountryCode + contactPhone;
        const log = {
          bookingId,
          taskId,
          status,
          sms,
          email: contactEmail,
          countryCode: phoneNumberCountryCode,
          phone: contactPhone,
          datetime,
        };

        if (phoneNumber.startsWith('07') || phoneNumber.startsWith('+447')) {
          sendSms(phoneNumber, sms, log);
        }
      }
    }
  }
};
