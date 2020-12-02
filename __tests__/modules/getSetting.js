export default (key, valueOnly, settings) => {
  if (!key) {
    console.warn('Please pass a setting key to retrieve.');
    return null;
  }

  if (key && settings) {
    const foundSetting = settings.find((userSetting) => userSetting.key === key);

    if (foundSetting) {
      return valueOnly ? foundSetting.value : foundSetting;
    }

    return null;
  }

  return null;
};
