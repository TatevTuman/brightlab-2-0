import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Header from './Header'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Header', () => {
  it('renders correctly', async () => {
    const { container } = render(<Header />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
  })
})
