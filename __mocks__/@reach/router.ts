const router = jest.requireActual('@reach/router')

module.exports = {
  ...router,
  useMatch: (path: string) => {
    return global.location.pathname.includes(path)
  }
}
export {}
