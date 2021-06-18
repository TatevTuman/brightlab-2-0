const router = jest.requireActual('@reach/router')

module.exports = {
  ...router,
  useLocation: () => {
    return global.location
  },
  useMatch: (path: string) => {
    return global.location.pathname.includes(path)
  }
}
export {}
