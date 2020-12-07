import React from 'react'
import { act, cleanup, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown from './Dropdown'

jest.useFakeTimers()

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
    onSelect: jest.fn(),
    opened: false
  }

  it('renders correctly', async () => {
    const { container } = render(<Dropdown {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })

  it('renders options correctly', async () => {
    const { container, getByText, rerender } = render(<Dropdown {...props} />)
    const list = container.querySelector('ul')

    expect(list).toHaveAttribute('data-opened', 'false')

    options.forEach((option, index) => {
      const label = getByText(option.label)
      expect(label).toBeInTheDocument()

      userEvent.click(label)

      expect(props.onSelect).toHaveBeenCalledTimes(++index)
    })

    rerender(<Dropdown {...props} opened={true} />)

    expect(list).toHaveAttribute('data-opened', 'true')
  })

  it('renders loading correctly', async () => {
    const { container, rerender } = render(<Dropdown {...props} loading={true} />)
    await waitFor(() => container)

    let options = container.querySelectorAll('li')
    let loader = container.querySelector('.loader')

    expect(loader).toBeInTheDocument()
    expect(options).toHaveLength(0)

    rerender(<Dropdown {...props} loading={false} />)

    setTimeout(() => {
      options = container.querySelectorAll('li')
      loader = container.querySelector('.loader')

      expect(loader).toBeNull()
      expect(options).toHaveLength(props.options.length)
    }, 1000)

    act(() => {
      jest.runAllTimers()
    })
  })
})
