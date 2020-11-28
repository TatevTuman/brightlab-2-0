import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Modals from './Modals'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Modals', () => {
  it('renders correctly', async () => {
    const { container } = render(<Modals />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
  })
})
