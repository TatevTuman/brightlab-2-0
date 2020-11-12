import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

beforeAll(() => {})
afterAll(() => {})
beforeEach(() => {})
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
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
    expect(getByText(props.children)).toBeInTheDocument()
  })

  it('renders loading correctly', () => {
    const { getByText } = render(<Button {...props} loading={true} />)
    const inner = getByText('Загрузка...')

    expect(inner).toBeInTheDocument()
    expect(inner).toHaveAttribute('data-disabled', 'true')
  })

  it('renders disabled correctly', () => {
    const { getByText } = render(<Button {...props} disabled={true} />)
    const inner = getByText(props.children)

    expect(inner).toBeInTheDocument()
    expect(inner).toHaveAttribute('data-disabled', 'true')
  })

  it('click', () => {
    const { container } = render(<Button {...props} />)
    const inner = container.querySelector('button')

    userEvent.click(inner!)

    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  it('click on loading', () => {
    const { container } = render(<Button {...props} loading={true} />)
    const inner = container.querySelector('button')

    userEvent.click(inner!)

    expect(props.onClick).toHaveBeenCalledTimes(0)
  })

  it('click on disabled', () => {
    const { container } = render(<Button {...props} disabled={true} />)
    const inner = container.querySelector('button')

    userEvent.click(inner!)

    expect(props.onClick).toHaveBeenCalledTimes(0)
  })

  it('navigate instead of click', () => {
    const { container } = render(<Button {...props} to={'/'} />)
    const inner = container.querySelector('button')

    userEvent.click(inner!)

    expect(props.onClick).toHaveBeenCalledTimes(0)
  })
})
