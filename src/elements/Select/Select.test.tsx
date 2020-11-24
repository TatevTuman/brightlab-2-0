import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Select from './Select'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Select', () => {
  const options = [{ value: 'test', label: 'Test' }]

  it('renders correctly', async () => {
    // const { container } = render(<Select options={options} onSelect={() => null} />)
    // const awaitedContainer = await waitFor(() => container)
    //
    // expect(awaitedContainer).toMatchSnapshot()
    expect(0).toBe(1)
  })
})
