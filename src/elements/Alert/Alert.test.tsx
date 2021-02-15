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
    options: {
      onClose: jest.fn(),
      onOpen: jest.fn(),
      timeout: 1000
    },
    close: jest.fn(),
    style: {}
  }

  it('renders correctly', async () => {
    const { container, getByText } = render(<Alert {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
    expect(getByText(props.message)).toBeInTheDocument()
  })

  it('props[type] works correctly', async () => {
    const { getByTestId, rerender } = render(<Alert {...props} />)
    const types: AlertType[] = ['success', 'info', 'error']

    types.forEach(type => {
      rerender(<Alert {...props} options={{ type }} />)
      const alert = getByTestId('alert')
      expect(alert).toHaveAttribute('data-type', type)
    })
  })

  it('props[close] works correctly', async () => {
    const { getByTestId } = render(<Alert {...props} />)
    const alert = getByTestId('alert')

    userEvent.click(alert!)

    expect(props.close).toHaveBeenCalledTimes(1)
  })
})
