import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Alert, AlertVariantType } from '~ux'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Alert', () => {
  it('renders correctly', async () => {
    const props = {
      message: 'Test',
      close: () => null,
      options: { type: 'success' as AlertVariantType }
    }

    const { container } = render(<Alert {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
