import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '~ui'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Checkbox', () => {
  it('renders correctly', async () => {
    const props = {
      name: 'Test',
      value: true,
      onChange: jest.fn()
    }

    const { container } = render(<Checkbox {...props}>Test</Checkbox>)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
