import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from '~ux'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Dialog', () => {
  it('renders correctly', async () => {
    const props = {
      show: true,
      children: 'Test',
      onHide: jest.fn()
    }

    const { container } = render(<Dialog {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
