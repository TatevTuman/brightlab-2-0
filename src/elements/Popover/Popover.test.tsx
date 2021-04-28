import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import Popover from './Popover'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Popover', () => {
  it('renders correctly', async () => {
    const { container } = render(<Popover options={[]} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
