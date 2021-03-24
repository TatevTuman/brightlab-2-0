import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import PopoverController from './PopoverController'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Popover', () => {
  it('renders correctly', async () => {
    const { container } = render(<PopoverController />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
