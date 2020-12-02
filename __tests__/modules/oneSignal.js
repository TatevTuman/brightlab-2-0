const os = () => window.OneSignal || [];

const oneSignal = {
  isInit: false,
  init: (appId) => {
    os().push(() => os().init({ appId }));
    oneSignal.isInit = true;
    return oneSignal;
  },
  onSubscriptionChange: (method) => {
    os().push(() => os().on('subscriptionChange', method));
    return oneSignal;
  },
  getUserId: (callback) => {
    os().getUserId(callback);
    return oneSignal;
  },
  sendTags: (tags) => {
    os().push(() => os().sendTags(tags));
    return oneSignal;
  },
};

export default oneSignal;
