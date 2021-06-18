import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Radio } from '~ui'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Radio', () => {
  it('renders correctly', async () => {
    const props = {
      name: 'Test',
      value: true,
      onChange: jest.fn()
    }

    const { container } = render(<Radio {...props}>Test</Radio>)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
