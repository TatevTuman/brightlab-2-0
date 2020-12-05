import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Loader from './Loader'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Loader', () => {
  const props = {}

  it('renders correctly', async () => {
    const { container } = render(<Loader {...props} />)
    const awaitedLoader = await waitFor(() => container)

    expect(awaitedLoader).toMatchSnapshot()
  })
})
