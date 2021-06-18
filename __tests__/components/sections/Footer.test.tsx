import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Footer } from '~sections'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Footer', () => {
  it('renders correctly', async () => {
    const props = {}

    const { container } = render(<Footer {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
