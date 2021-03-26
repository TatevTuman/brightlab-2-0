import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import DateInput from './DateInput'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('DateInput', () => {
  it('renders correctly', async () => {
    const { container } = render(<DateInput />)
    await waitFor(() => container)
    expect(container).toMatchSnapshot()
  })
})
