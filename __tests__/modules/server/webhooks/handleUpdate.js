import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { getCustomField } from '../tookan';
import {
  authoriseAndCapturePayment,
  authorisePayment,
  cancelPayment,
  capturePayment,
} from '../payments';
import Tasks from '../../../api/Tasks/Tasks';
import Bookings from '../../../api/Bookings/Bookings';
import PricingModels from '../../../api/PricingModels/PricingModels';
import handleCallback from './handleCallback';

export default (request) => {
  const {
    body: {
      job_id: tookanJobId,
      job_state: jobState,
      fleet_id: fleetId,
      fleet_latitude: fleetLatitude,
      fleet_longitude: fleetLongitude,
      custom_fields: customFields,
    },
  } = request;

  // Find task from job ID
  const task = Tasks.findOne({ tookanJobId });

  // Return if no task found
  if (!task) return;

  const {
    _id: taskId,
    status: taskStatus,
    arrivedAt,
    arrivedLocation,
    bookingId,
    tookanFleetId,
    owner,
  } = task;

  // Find booking associated with tasks
  const booking = Bookings.findOne({ _id: bookingId });

  if (!booking) return;

  const { service: bookingService, price, charge } = booking;

  // Create date for now
  const isoDate = new Date().toISOString();

  // Create variables
  const variables = {
    updatedAt: isoDate,
    tookanUpdatedAt: isoDate,
  };

  // Destructure settings
  const {
    public: {
      stripe: {
        status: { cancelled: paymentCancelled },
      },
      booking: {
        status: {
          draft,
          scheduled,
          completed,
          started: bookingStarted,
          cancelled: bookingCancelled,
          declined: bookingDeclined,
        },
      },
      tasks: {
        status: {
          unassigned,
          assigned,
          started,
          arrived,
          inprogress,
          successful,
          failed,
          cancelled,
          deleted,
          declined,
        },
      },
    },
    private: {
      booking: { services },
    },
  } = Meteor.settings;

  // Set task state from job state (the task state field is unreliable)
  variables.status = jobState.toLowerCase();

  let { status: bookingStatus } = booking;

  // Webhook should not set the status of a task to deleted if it is part of a draft booking
  if (variables.status === deleted && bookingStatus === draft) {
    variables.status = unassigned;
  }

  // Check a task status change has occurred
  if (variables.status !== taskStatus) {
    const location = [fleetLatitude, fleetLongitude];

    // Handle task status
    switch (variables.status) {
      case started:
        variables.startedAt = isoDate;
        variables.startedLocation = location;
        break;

      case arrived:
        variables.arrivedAt = isoDate;
        variables.arrivedLocation = location;
        break;

      case inprogress:
        variables.status = arrived;

        if (!arrivedAt) {
          variables.arrivedAt = isoDate;
        }

        if (!arrivedLocation) {
          variables.arrivedLocation = location;
        }

        handleCallback(tookanJobId, fleetLatitude, fleetLongitude, inprogress, isoDate);
        break;

      case successful:
        if (taskStatus !== failed) {
          variables.completedAt = isoDate;
          variables.completedLocation = location;
        }
        break;

      case failed:
        if (taskStatus !== successful) {
          variables.completedAt = isoDate;
          variables.completedLocation = location;
        }
        break;

      case declined:
        variables.declinedAt = isoDate;
        break;

      default:
        break;
    }

    console.log(`Updating status of task ${taskId} to "${variables.status}" at ${isoDate}.`);
  }

  if (fleetId && fleetId !== tookanFleetId) {
    console.log(`Updating task agent to ${fleetId} at ${isoDate}.`);

    handleCallback(tookanJobId, fleetLatitude, fleetLongitude, assigned, isoDate);
    variables.tookanFleetId = fleetId;
  }

  // Check for ETA
  let eta = getCustomField('ETA', customFields);

  if (eta && eta.indexOf('Today at ') >= 0) {
    eta = eta.substring(9, eta.length);
    eta = new Date(moment().format('YYYY-MM-DD ') + eta);

    variables.eta = moment(eta).toISOString();
  }

  // Update task status and agent ID in database
  Tasks.update({ _id: taskId }, { $set: variables });

  // Only continue if this booking is not a draft
  if (bookingStatus !== draft) {
    const { pickup, dropoff } = Meteor.settings.public.tasks.type;

    let pickupTasks = 0;
    let dropoffTasks = 0;

    // Get all tasks associated with booking
    const bookingTasks = Tasks.find({ bookingId }).fetch();

    // Check booking has at least one pickup and one dropoff that isn't cancelled/declined
    bookingTasks.forEach((bookingTask) => {
      if (bookingTask.status !== cancelled && bookingTask.status !== declined) {
        if (bookingTask.type === pickup) {
          pickupTasks += 1;
        } else if (bookingTask.type === dropoff) {
          dropoffTasks += 1;
        }
      }
    });

    // Bookings must have at least one pickup and one dropoff
    if (!pickupTasks || !dropoffTasks) {
      const { cancelBuffer } = services[bookingService];

      // Update booking status if task is cancelled or declined
      switch (variables.status) {
        case cancelled:
          bookingStatus = bookingCancelled;
          break;

        case declined:
          bookingStatus = bookingDeclined;
          break;

        default:
          break;
      }

      // Cancel payment if booking declined. Otherwise, maybe charge minimum fee.
      if (bookingStatus === bookingDeclined) {
        Bookings.update(
          { _id: bookingId },
          {
            $set: {
              status: bookingStatus,
              updatedAt: isoDate,
            },
          },
        );

        cancelPayment(bookingId);
      } else if (bookingTasks && bookingTasks.length) {
        const minStartTime = moment.min(
          bookingTasks.map((bookingTask) => moment(bookingTask.start)),
        );

        // Capture minimum payment if booking start time is less than cancellation buffer
        if (minStartTime) {
          if (minStartTime.subtract(cancelBuffer, 'm').isBefore()) {
            if (!charge) {
              let {
                price: { minimum },
              } = services[bookingService];

              // Check if pricing model exists and get minimum from that
              const {
                payment: { pricingModels: pricingModelIds },
              } = Meteor.users.findOne({ _id: owner });

              if (pricingModelIds && pricingModelIds.length) {
                const pricingModel = PricingModels.findOne({
                  _id: {
                    $in: pricingModelIds,
                  },
                  service: bookingService,
                });

                if (pricingModel) {
                  ({ minimum } = pricingModel);
                }
              }

              // Set booking charge before capturing payment
              Bookings.update(
                { _id: bookingId },
                {
                  $set: { charge: minimum },
                },
              );

              Meteor.call('logBookingFinance', {
                bookingId,
                finance: { type: 'Booking update minimum charge', charge: price },
              });
            }

            capturePayment(bookingId);
          } else {
            cancelPayment(bookingId);
          }
        }
      }
    } else {
      let startedTasks = 0;
      let completedTasks = 0;

      // Check if booking tasks are started or completed
      bookingTasks.forEach((bookingTask) => {
        if (
          [started, arrived, successful, failed, cancelled, declined].indexOf(bookingTask.status) >=
          0
        ) {
          startedTasks += 1;
        }

        if ([successful, failed, cancelled, declined].indexOf(bookingTask.status) >= 0) {
          completedTasks += 1;
        }
      });

      // Determine booking status based on task status
      if (completedTasks >= bookingTasks.length) {
        bookingStatus = completed;

        Bookings.update(
          { _id: bookingId },
          {
            $set: { charge: price },
          },
        );

        Meteor.call('logBookingFinance', {
          bookingId,
          finance: { type: 'Booking update', charge: price },
        });

        capturePayment(bookingId);
      } else if (startedTasks) {
        bookingStatus = Meteor.settings.public.booking.status.started;
      } else {
        bookingStatus = scheduled;
      }
    }

    // Update booking status in database
    Bookings.update(
      { _id: bookingId },
      {
        $set: {
          status: bookingStatus,
          updatedAt: isoDate,
        },
      },
    );

    // Re-authorise cancelled payment if necessary
    if (booking.api && booking.api.stripe && booking.api.stripe.status === paymentCancelled) {
      if (bookingStatus === scheduled || bookingStatus === bookingStarted) {
        authorisePayment(bookingId);
      } else if (bookingStatus === completed) {
        authoriseAndCapturePayment(bookingId);
      }
    }
  }
};
