import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '~ui'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Switch', () => {
  it('renders correctly', async () => {
    const props = {
      value: true,
      onChange: jest.fn()
    }

    const { container } = render(<Switch {...props}>Test</Switch>)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
