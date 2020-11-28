const router = jest.requireActual('@reach/router')

module.exports = {
  ...router,
  useMatch: (path: string) => global.location.pathname.includes(path)
}
export {}
