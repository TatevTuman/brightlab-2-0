import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown from './Dropdown'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Dropdown', () => {
  const options = [{ value: 'test', label: 'Test' }]

  it('renders correctly', async () => {
    // const { container } = render(<Dropdown options={options} onSelect={() => null} />)
    // const awaitedContainer = await waitFor(() => container)
    //
    // expect(awaitedContainer).toMatchSnapshot()
    expect(0).toBe(1)
  })
})
