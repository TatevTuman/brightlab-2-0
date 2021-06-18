import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '~ui'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Button', () => {
  it('renders correctly', async () => {
    const props = {}

    const { container } = render(<Button {...props}>Test</Button>)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
