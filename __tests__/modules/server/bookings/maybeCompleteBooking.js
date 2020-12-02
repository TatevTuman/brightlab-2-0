import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { capturePayment, reauthoriseAndCapturePayment } from '../payments';
import Bookings from '../../../api/Bookings/Bookings';
import Tasks from '../../../api/Tasks/Tasks';
import DiscountCodes from '../../../api/DiscountCodes/DiscountCodes';
import Logs from '../../../api/Logs/Logs';

const getDiscountCode = (booking, charge) => {
  const discountCode = booking.discountCode && DiscountCodes.findOne(booking.discountCode);

  if (discountCode) {
    let discountCodeValue = 0;
    const { code, type, value, usages, maxDiscountValue } = discountCode;

    const isCredit = type === 'credit';
    const isPercentage = type === 'percentage';
    const userUsages = usages.filter((usage) => usage.userId === booking.owner);
    const userTotalDiscountByCode = userUsages.reduce((acc, usage) => acc + usage.discount, 0);

    const discountValue = isCredit ? value - userTotalDiscountByCode : value;

    if (isPercentage) {
      const percentDiscount = (charge / 100) * discountValue;

      if (maxDiscountValue && percentDiscount > maxDiscountValue) {
        discountCodeValue = maxDiscountValue;
      } else {
        discountCodeValue = percentDiscount;
      }
    } else {
      discountCodeValue = discountValue > charge ? charge : discountValue;
    }

    return { code, value: discountCodeValue };
  }

  return null;
};

const calculateBookingParams = (tasks, distance, priceDiff, pricing) => {
  const baseValuePerTask = pricing.base / tasks.length;
  const bookingDistancePerTask = distance / tasks.length;

  // Get discount value that included in priceDiff
  const discountDiff = 1 - pricing.discount / 100;

  return tasks.reduce(
    (params, bookingTask, index) => {
      const { _id, type, start, arrivedAt, completedAt, timeOffset, expectedWait } = bookingTask;

      const startMoment = moment(start);
      // const startedAtMoment = moment(startedAt);
      const arrivedAtMoment = moment(arrivedAt);
      const completedAtMoment = moment(completedAt);

      let taskDuration = (timeOffset || 0) - params.expectedWait - params.duration;
      // Minutes between agent completed time and agent arrived time
      let taskWaiting = completedAtMoment.diff(arrivedAtMoment, 's');

      const isFirstTask = index === 0;

      if (isFirstTask) {
        // Duration of first task is 0;
        taskDuration = 0;

        const taskCompletedAtStartDiff = completedAtMoment.diff(startMoment, 's');
        const taskArrivedAtStartDiff = arrivedAtMoment.diff(startMoment, 's');

        const isAgentCompletedTaskAfterStartTime = taskCompletedAtStartDiff > 0;
        const isAgentArrivedToTaskBeforeStartTime = taskArrivedAtStartDiff < 0;

        // If agent completed task after start time
        if (isAgentCompletedTaskAfterStartTime) {
          // If agent arrvied before task start time
          if (isAgentArrivedToTaskBeforeStartTime) {
            // in this case waiting is the diff between completed and start
            taskWaiting = completedAtMoment.diff(startMoment, 's');
          }

          // If agent arrvied after task start time leave calculations as they are
        } else {
          // If agent completed task before start time
          taskWaiting = 0;
        }
      }

      // Get positive values
      taskDuration = Math.max(taskDuration, 0);

      if (pricing.minimumWaiting) {
        taskWaiting = Math.max(taskWaiting, pricing.minimumWaiting);
      }

      let taskCharge = baseValuePerTask;

      taskCharge += (taskDuration / 60) * pricing.time;
      taskCharge += (taskWaiting / 60) * pricing.waiting;
      taskCharge += (bookingDistancePerTask / 1000) * pricing.distance;
      taskCharge += type === 'pickup' ? pricing.pickup : pricing.dropoff;
      // Get charge with priceDiff but excluding discount
      // because discount should be applied after min/max constraits
      taskCharge *= priceDiff / discountDiff;
      taskCharge = Math.max(taskCharge, 0);

      const nextDuration = parseFloat((params.duration + taskDuration).toFixed(3));
      const nextWaiting = parseFloat((params.waiting + taskWaiting).toFixed(3));
      const nextCharge = params.charge + taskCharge;
      const nextTasks = [
        ...params.tasks,
        {
          _id,
          actualWait: taskWaiting,
          duration: taskDuration,
          charge: taskCharge,
          type,
        },
      ];

      const nextExpectedWait = params.expectedWait + expectedWait;

      return {
        duration: nextDuration,
        waiting: nextWaiting,
        charge: nextCharge,
        tasks: nextTasks,
        expectedWait: nextExpectedWait,
      };
    },
    {
      duration: 0,
      waiting: 0,
      charge: 0,
      tasks: [],
      expectedWait: 0,
    },
  );
};

const calculateBookingCharge = (tasks, charge, chargeDiff, hotBox, discountDiff, pricingModel) => {
  const {
    private: {
      agent: {
        commission: { vat, rate },
      },
    },
  } = Meteor.settings;

  const hotBoxValuePerTask = hotBox / tasks.length;

  return tasks.reduce(
    (acc, task) => {
      const { _id, type, actualWait, duration } = task;

      const taskChargeDiff = task.charge / charge;
      const taskChargeDiffMargin = chargeDiff * taskChargeDiff;
      const taskCharge = task.charge + taskChargeDiffMargin + hotBoxValuePerTask;
      const taskChargeWithDiscount = taskCharge * discountDiff;

      let taskCommission = (taskChargeWithDiscount / (1 + vat)) * rate;

      if (pricingModel) {
        const { commissionRate, maxCommission, pickupCommission, dropoffCommission } = pricingModel;

        if (commissionRate || maxCommission || pickupCommission || dropoffCommission) {
          taskCommission = 0;

          if (commissionRate) {
            taskCommission = (taskChargeWithDiscount / (1 + vat)) * commissionRate;
          }

          if (type === 'pickup' && pickupCommission) {
            taskCommission += pickupCommission;
          }

          if (type === 'dropoff' && dropoffCommission) {
            taskCommission += dropoffCommission;
          }

          if (maxCommission) {
            taskCommission = Math.min(taskCommission, maxCommission);
          }
        }
      }

      const nextCharge = parseFloat(taskChargeWithDiscount.toFixed(2));
      const nextCommission = parseFloat(taskCommission.toFixed(2));

      Tasks.update(_id, {
        $set: {
          actualWait,
          duration,
          charge: nextCharge,
          commission: nextCommission,
        },
      });

      return [acc[0] + nextCharge, acc[1] + nextCommission];
    },
    [0.0, 0.0],
  );
};

const getPricing = (service, pricingModel) => {
  let {
    price: {
      base,
      waiting,
      time,
      distance,
      pickup,
      dropoff,
      minimumWaiting,
      minimum,
      maximum,
      discount,
    },
  } = service;

  if (pricingModel) {
    // TODO VLAD add minimumWaiting to the pricing models
    base = pricingModel.base || 0;
    waiting = pricingModel.waiting || 0;
    time = pricingModel.time || 0;
    distance = pricingModel.distance || 0;
    pickup = pricingModel.pickup || 0;
    dropoff = pricingModel.dropoff || 0;
    minimum = pricingModel.minimum || 0;
    maximum = pricingModel.maximum || 0;
    discount = pricingModel.discount || 0;
  }

  return {
    base,
    waiting,
    time,
    distance,
    pickup,
    dropoff,
    minimumWaiting,
    minimum,
    maximum,
    discount,
  };
};

const getCompletedTasks = (bookingId, pickupIds, dropoffIds) => {
  const tasks = Tasks.find({ bookingId }).fetch();
  const tasksIds = [...pickupIds, ...dropoffIds];
  const sortedTasks = tasksIds.map((bookingTaskId) =>
    tasks.find((task) => task._id === bookingTaskId),
  );

  const {
    public: {
      tasks: {
        status: {
          successful: taskSuccessful,
          failed: taskFailed,
          cancelled: taskCancelled,
          declined: taskDeclined,
        },
      },
    },
  } = Meteor.settings;

  // A task is completed if its status is "successful", "failed", "cancelled" or "declined"
  const completedTasks = sortedTasks.filter(
    (task) => [taskSuccessful, taskFailed, taskCancelled, taskDeclined].indexOf(task.status) >= 0,
  );

  const isTasksCompleted = completedTasks && completedTasks.length === sortedTasks.length;

  return isTasksCompleted ? completedTasks : null;
};

export default (booking, user, pricingModel, status) => {
  const { _id: bookingId } = booking;

  const tasks = getCompletedTasks(bookingId, booking.pickupIds, booking.dropoffIds);

  if (!tasks) return;

  const {
    public: {
      booking: {
        status: { completed: bookingCompleted },
      },
    },
    private: {
      booking: { services },
    },
  } = Meteor.settings;

  // Get service
  const service = services[booking.service];
  // Get pricing
  const pricing = getPricing(service, pricingModel);
  // Get hotBox value
  const hotBox = booking.isHotBox ? 5.0 : 0.0;
  // Get discount value that included in priceDiff
  const discountDiff = 1 - pricing.discount / 100;

  const {
    duration: calculatedBookingDuration,
    waiting: calculatedBookingWaiting,
    charge: calculatedBookingChargeWithoutDiscount,
    tasks: calculatedBookingTasks,
  } = calculateBookingParams(tasks, booking.distance, booking.priceDiff, pricing);

  // Apply constraits to charge
  let bookingChargeWithConstraits = calculatedBookingChargeWithoutDiscount;

  if (pricing.minimum) {
    bookingChargeWithConstraits = Math.max(bookingChargeWithConstraits, pricing.minimum);
  }

  if (pricing.maximum) {
    bookingChargeWithConstraits = Math.min(bookingChargeWithConstraits, pricing.maximum);
  }

  // Get diff between charges to add this margin to tasks
  const bookingChargeWithConstraitsDiff =
    bookingChargeWithConstraits - calculatedBookingChargeWithoutDiscount;

  // Calculate booking charge with discount and commission
  let [charge, commission] = calculateBookingCharge(
    calculatedBookingTasks,
    calculatedBookingChargeWithoutDiscount,
    bookingChargeWithConstraitsDiff,
    hotBox,
    discountDiff,
    pricingModel,
  );

  // Get discount code value
  const discountCode = getDiscountCode(booking, charge);

  if (discountCode) {
    // Get charge with discount code
    charge -= discountCode.value;
  }

  // Apply 0 if discount make price less then 0
  charge = Math.max(charge, 0);
  charge = parseFloat(charge.toFixed(2));
  commission = parseFloat(commission.toFixed(2));

  Bookings.update(
    { _id: bookingId },
    {
      $set: {
        charge,
        status: bookingCompleted,
        updatedAt: new Date().toISOString(),
      },
    },
  );

  const {
    private: {
      agent: {
        commission: { vat },
      },
    },
  } = Meteor.settings;

  // Logging all calculations
  const bookingFinanceLog = {
    customer: `${user?.profile?.name?.first} ${user?.profile?.name?.last}`,
    bookingId,
    bookingStatus: bookingCompleted,
    vat,
    commission,
    price: booking.price,
    finance: {
      type: `Booking ${status}`,
      price: booking.price,
      distance: {
        units: parseFloat((booking.distance / 1000).toFixed(3)),
        perUnit: pricing.distance,
        total: parseFloat(((booking.distance / 1000) * pricing.distance).toFixed(2)),
      },
      duration: {
        units: parseFloat((calculatedBookingDuration / 60).toFixed(3)),
        perUnit: pricing.time,
        total: parseFloat(((calculatedBookingDuration / 60) * pricing.time).toFixed(2)),
      },
      waiting: {
        units: parseFloat((calculatedBookingWaiting / 60).toFixed(3)),
        perUnit: pricing.waiting,
        total: parseFloat(((calculatedBookingWaiting / 60) * pricing.waiting).toFixed(2)),
      },
      hotBox,
      charge,
    },
  };

  console.log('discountCode', discountCode);

  if (discountCode) {
    bookingFinanceLog.finance.discountCode = {
      code: discountCode.code,
      value: parseFloat(discountCode.value.toFixed(2)),
    };
  }

  const isEstimateLog = Logs.bookingsFinance.find({ bookingId }).fetch().length > 0;

  if (!isEstimateLog) {
    Meteor.call('getPriceByBookingId', bookingId, true, true, (err) => {
      console.error(err);
      Meteor.call('logBookingFinance', bookingFinanceLog);
    });
  } else {
    Meteor.call('logBookingFinance', bookingFinanceLog);
  }

  // Re-authorise payment if charge greater than price. Otherwise, just capture the payment.
  if (charge > booking.price) {
    reauthoriseAndCapturePayment(bookingId);
  } else {
    capturePayment(bookingId);
  }
};
