import React from 'react'
import { render, cleanup, waitFor, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Button', () => {
  const props = {
    children: 'children',
    onClick: jest.fn()
  }

  it('renders correctly', async () => {
    const { container, getByText } = render(<Button {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
    expect(getByText(props.children)).toBeInTheDocument()
  })

  it('renders loading correctly', async () => {
    const { container, rerender } = render(<Button {...props} loading={true} />)
    await waitFor(() => container)

    const button = container.querySelector('button')
    let loader = container.querySelector('.loader')

    expect(loader).toBeInTheDocument()
    expect(button).toHaveAttribute('data-disabled', 'true')

    rerender(<Button {...props} loading={false} />)

    setTimeout(() => {
      loader = container.querySelector('.loader')

      expect(loader).toBeNull()
      expect(button).toHaveAttribute('data-disabled', 'false')
    }, 1000)

    act(() => {
      jest.runAllTimers()
    })
  })

  it('renders disabled correctly', () => {
    const { getByText, rerender } = render(<Button {...props} disabled={true} />)
    const button = getByText(props.children)

    expect(button).toHaveAttribute('data-disabled', 'true')

    rerender(<Button {...props} disabled={false} />)

    expect(button).toHaveAttribute('data-disabled', 'false')
  })

  it('click', () => {
    const { container } = render(<Button {...props} />)
    const button = container.querySelector('button')

    userEvent.click(button!)

    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  it('click on loading', () => {
    const { container } = render(<Button {...props} loading={true} />)
    const button = container.querySelector('button')

    userEvent.click(button!)

    expect(props.onClick).toHaveBeenCalledTimes(0)
  })

  it('click on disabled', () => {
    const { container } = render(<Button {...props} disabled={true} />)
    const button = container.querySelector('button')

    userEvent.click(button!)

    expect(props.onClick).toHaveBeenCalledTimes(0)
  })

  it('navigate instead of click', () => {
    const { container } = render(<Button {...props} to={'/'} />)
    const button = container.querySelector('button')

    userEvent.click(button!)

    expect(props.onClick).toHaveBeenCalledTimes(0)
  })

  it('onkeydown', () => {
    const { container } = render(<Button {...props} />)
    const button = container.querySelector('button')

    userEvent.tab()

    fireEvent.keyDown(button!, { key: 'Tab' })
    expect(props.onClick).toHaveBeenCalledTimes(0)

    fireEvent.keyDown(button!, { key: 'Esc' })
    expect(props.onClick).toHaveBeenCalledTimes(0)

    fireEvent.keyDown(button!, { key: 'Enter' })
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
