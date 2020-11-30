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
  const options = new Array(4).fill(0).map((_, index) => ({
    label: `Page${index}`,
    value: `/page${index}`
  }))

  const props = {
    options,
    onSelect: jest.fn()
  }

  it('renders correctly', async () => {
    const { container, getByText } = render(<Dropdown {...props} />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()

    options.forEach((option, index) => {
      const label = getByText(option.label)
      expect(label).toBeInTheDocument()

      userEvent.click(label)

      expect(props.onSelect).toHaveBeenCalledTimes(++index)
    })
  })
})
