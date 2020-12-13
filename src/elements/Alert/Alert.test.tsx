import React from 'react'
import { AlertType } from 'react-alert'
import { render, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Alert from './Alert'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Alert', () => {
  const props = {
    id: 'test',
    message: 'Test message',
    options: {},
    close: jest.fn(),
    style: {}
  }

  it('renders correctly', async () => {
    const { container, getByText } = render(<Alert {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
    expect(getByText(props.message)).toBeInTheDocument()
  })

  it('renders different types correctly', async () => {
    const { getByTestId, rerender } = render(<Alert {...props} />)
    const types: AlertType[] = ['success', 'info', 'error']

    types.forEach(type => {
      rerender(<Alert {...props} options={{ type }} />)
      const alert = getByTestId('alert')
      expect(alert).toHaveAttribute('data-type', type)
    })
  })

  it('closes', async () => {
    const { getByTestId } = render(<Alert {...props} />)
    const alert = getByTestId('alert')

    userEvent.click(alert!)

    expect(props.close).toHaveBeenCalledTimes(1)
  })
})
