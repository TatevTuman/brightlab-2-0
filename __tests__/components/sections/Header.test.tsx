import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '~sections'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Header', () => {
  it('renders correctly', async () => {
    const props = {}

    const { container } = render(<Header {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
