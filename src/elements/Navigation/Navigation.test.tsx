import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import Navigation from './Navigation'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Navigation', () => {
  const navigation = new Array(4).fill(0).map((_, index) => ({
    path: `/page${index}`,
    label: `Page${index}`
  }))

  it('renders correctly', async () => {
    const { container } = render(<Navigation navigation={navigation} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
