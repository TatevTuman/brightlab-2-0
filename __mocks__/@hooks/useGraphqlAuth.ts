export default jest.fn(() => {
  const signIn = jest.fn()
  const signUp = jest.fn()

  return { signIn, signUp }
})
