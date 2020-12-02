import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import crypto from 'crypto';
import Tasks from '../../../api/Tasks/Tasks';
import Bookings from '../../../api/Bookings/Bookings';
import Agents from '../../../api/Agents/Agents';
import { bookingService } from '../../bookings';

export default (tookanJobId, lat, lng, status, datetime) => {
  return new Promise((resolve, reject) => {
    const task = Tasks.findOne({ tookanJobId });
    if (!task) return null;

    const booking = Bookings.findOne(task.bookingId);
    if (!booking) return null;

    const { _id: bookingId, owner, service } = booking;

    const user = Meteor.users.findOne({ _id: owner });
    if (!user) return null;

    const {
      profile: { tasksCallbackUrl, tasksCallbackSecret },
    } = user;

    if (!tasksCallbackUrl || !tasksCallbackSecret) return null;

    const { _id: taskId, tookanFleetId, meta } = task;

    const data = {
      bookingId,
      taskId,
      tookanJobId,
      lat,
      lng,
      status,
      datetime,
      meta,
    };

    if (tookanFleetId) {
      const agent = Agents.findOne({ fleetId: tookanFleetId });

      if (agent) {
        data.agent = {
          name: agent.name,
        };
      }
    }

    if (status === 'started') {
      const isPickup = task.type === 'pickup';

      if (isPickup) {
        const taskAddressLocation = task.address.location;
        const location = [`${lat},${lng}`, `${taskAddressLocation.join(',')}`];

        const { mode } = bookingService(service);

        const response = Meteor.call('directions', location, mode);

        if (response) {
          const { routes } = response;

          if (response.status === 'OK' && routes.length) {
            const route = routes[0];
            const { legs } = route;
            data.eta = legs[0].duration.value / 60;
          }
        }
      } else {
        data.eta = Math.floor(task.duration / 60);
      }
    }

    const json = JSON.stringify(data);

    const checksum = crypto
      .createHmac('md5', tasksCallbackSecret)
      .update(json)
      .digest('hex');

    HTTP.post(
      tasksCallbackUrl,
      { data, headers: { 'content-checksum': checksum } },
      (error, res) => {
        Meteor.call('logTaskCallback', {
          bookingId,
          status,
          url: tasksCallbackUrl,
          error: error ? error.message || error.toString() : '',
        });

        if (error) reject(error);
        resolve(res);
      },
    );
  }).catch((error) => {
    console.error(error.message);
  });
};
