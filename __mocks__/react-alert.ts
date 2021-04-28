const reactAlert = jest.requireActual('react-alert')

module.exports = {
  ...reactAlert,
  useAlert: () => ({
    show: () => null,
    remove: () => null,
    success: () => null,
    error: () => null,
    info: () => null
  })
}

export {}
