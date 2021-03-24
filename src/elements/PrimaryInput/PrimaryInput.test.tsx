import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PrimaryInput from './PrimaryInput'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('PrimaryInput', () => {
  it('renders correctly', async () => {
    const { container } = render(<PrimaryInput name={'input'} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })

  it('renders no label correctly', () => {
    const { container } = render(<PrimaryInput name={'input'} />)
    const label = container.querySelector('label')?.querySelector('label') || null

    expect(label).toBe(null)
  })

  it('renders label correctly', () => {
    const props = {
      name: 'input',
      label: 'input label'
    }

    const { getByText } = render(<PrimaryInput {...props} />)
    const label = getByText(props.label)
    expect(label).toBeInTheDocument()
  })

  it('renders required label correctly', () => {
    const props = {
      name: 'input',
      label: 'input label',
      required: true
    }
    const { container } = render(<PrimaryInput {...props} />)
    const label = container.querySelector('[data-required]') as HTMLInputElement

    expect(label).toHaveAttribute('data-required', 'true')
  })

  it('render error correctly', () => {
    const props = {
      name: 'input',
      error: true
    }
    const { getByTestId } = render(<PrimaryInput {...props} />)
    const inner = getByTestId('inner')
    expect(inner).toHaveAttribute('data-error', 'true')
  })

  it('renders disabled correctly', () => {
    const props = {
      name: 'input',
      label: 'input label',
      onFocus: jest.fn(),
      disabled: true
    }

    const { container, rerender } = render(<PrimaryInput {...props} />)
    const input = container.querySelector('[data-disabled]') as HTMLInputElement

    userEvent.tab()

    expect(props.onFocus).toHaveBeenCalledTimes(0)
    expect(input).toHaveAttribute('data-disabled', 'true')

    rerender(<PrimaryInput {...props} disabled={false} />)

    userEvent.tab()

    expect(props.onFocus).toHaveBeenCalledTimes(1)
    expect(input).toHaveAttribute('data-disabled', 'false')
  })

  it('handles onChange on label', () => {
    const props = {
      name: 'input',
      label: 'input label',
      onChange: jest.fn()
    }

    const { getByText, getByLabelText } = render(<PrimaryInput {...props} />)
    const label = getByText(props.label)
    const input = getByLabelText(props.label) as HTMLInputElement

    userEvent.click(label!)
    userEvent.type(label!, 'test')

    expect(props.onChange).toHaveBeenCalledTimes(4)
    expect(input.value).toBe('test')
  })

  it('handles onChange', () => {
    const props = {
      name: 'input',
      label: 'input label',
      onChange: jest.fn()
    }

    const { getByLabelText } = render(<PrimaryInput {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    userEvent.type(input!, 'test')

    expect(props.onChange).toHaveBeenCalledTimes(4)
    expect(input.value).toBe('test')
  })

  it('handles onFocus/onBlur', async () => {
    const props = {
      name: 'input',
      label: 'input label',
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }
    render(<PrimaryInput {...props} />)

    /* Simulate tab */
    userEvent.tab()
    expect(props.onFocus).toHaveBeenCalledTimes(1)

    userEvent.tab()
    expect(props.onBlur).toHaveBeenCalledTimes(1)
  })
})
