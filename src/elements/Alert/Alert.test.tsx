import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Alert from './Alert'

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
    const awaitedAlert = await waitFor(() => container)

    // TODO
    expect(awaitedAlert).toMatchSnapshot()
    expect(getByText(props.message)).toBeInTheDocument()
  })
})
