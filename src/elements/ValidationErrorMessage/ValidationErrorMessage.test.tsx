import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import ValidationErrorMessage, { ValidationErrorMessageType } from './ValidationErrorMessage'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('ValidationErrorMessage', () => {
  const props = {
    errors: {
      test: {
        type: 'required',
        message: 'Test is required'
      }
    },
    name: 'test'
  }

  it('renders correctly', async () => {
    const { container, getByText } = render(<ValidationErrorMessage {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
    expect(getByText(props.errors.test.message)).toBeInTheDocument()
  })

  it('uses render prop', async () => {
    const renderProp = (error: ValidationErrorMessageType) => (
      <div role={'validation-error'} data-testid={'validation-error'}>
        {error.message}
      </div>
    )
    const { getByTestId } = render(<ValidationErrorMessage {...props} render={renderProp} />)

    expect(getByTestId('validation-error')).toBeInTheDocument()
  })
})
