import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

jest.mock('../ValidationErrorMessage/ValidationErrorMessage.tsx')

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Input', () => {
  it('renders correctly', async () => {
    const { container } = render(<Input name={'input'} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })

  it('renders no label correctly', () => {
    const { container } = render(<Input name={'input'} />)
    const label = container.querySelector('label')?.querySelector('label') || null

    expect(label).toBe(null)
  })

  it('renders label correctly', () => {
    const props = {
      name: 'input',
      label: 'input label'
    }

    const { getByText } = render(<Input {...props} />)

    expect(getByText(props.label)).toBeInTheDocument()
  })

  it('renders required label correctly', () => {
    const props = {
      name: 'input',
      label: 'input label',
      validation: { required: true }
    }

    const { getByText } = render(<Input {...props} />)
    const label = getByText(props.label)

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('data-required', 'true')
  })

  it('renders disabled correctly', () => {
    const props = {
      name: 'input',
      label: 'input label',
      onFocus: jest.fn(),
      disabled: true
    }

    const { getByLabelText, rerender } = render(<Input {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    userEvent.tab()

    expect(props.onFocus).toHaveBeenCalledTimes(0)
    expect(input).toHaveAttribute('data-disabled', 'true')

    rerender(<Input {...props} disabled={false} />)

    userEvent.tab()

    expect(props.onFocus).toHaveBeenCalledTimes(1)
    expect(input).toHaveAttribute('data-disabled', 'false')
  })

  it('handles change on label', () => {
    const props = {
      name: 'input',
      label: 'input label',
      onChange: jest.fn()
    }

    const { getByText, getByLabelText } = render(<Input {...props} />)
    const label = getByText(props.label)
    const input = getByLabelText(props.label) as HTMLInputElement

    userEvent.click(label!)
    userEvent.type(label!, 'test')

    expect(props.onChange).toHaveBeenCalledTimes(4)
    expect(input.value).toBe('test')
  })

  it('handles change', () => {
    const props = {
      name: 'input',
      label: 'input label',
      onChange: jest.fn()
    }

    const { getByLabelText } = render(<Input {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    userEvent.type(input!, 'test')

    expect(props.onChange).toHaveBeenCalledTimes(4)
    expect(input.value).toBe('test')
  })

  // TODO focus test sync with Select tests
})
