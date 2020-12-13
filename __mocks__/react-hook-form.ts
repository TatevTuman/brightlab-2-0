/*
  All components that use useFormContext should have FormProvider as a DOM parent to get context -
  so all tests where such component is used will throw an error 'Can't read property [...] of null'.
  This why i mocked this
*/
const reactHookForm = jest.requireActual('react-hook-form')

module.exports = {
  ...reactHookForm,
  useFormContext: () => ({
    errors: {
      test: {
        type: 'required',
        message: 'Test is required'
      }
    }
  })
}

export {}
