import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkbox from './Checkbox'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Checkbox', () => {
  it('renders correctly', async () => {
    const { container } = render(<Checkbox name={'checkbox'} checked={true} />)
    expect(container).toMatchSnapshot()
  })

  it('renders no label correctly', () => {
    const { container } = render(<Checkbox name={'checkbox'} checked={true} />)

    const label = container.querySelector('label')?.querySelector('label')

    expect(label).toBe(undefined)
  })

  it('renders label correctly', () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label',
      checked: true
    }

    const { getByText } = render(<Checkbox {...props} />)

    expect(getByText(props.label)).toBeInTheDocument()
  })

  it('renders required label correctly', () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label',
      required: true,
      checked: true
    }

    const { getByText } = render(<Checkbox {...props} />)
    const label = getByText(props.label)

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('data-required', 'true')
  })

  it('handles onChange on label', () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label',
      checked: true,
      onChange: jest.fn()
    }

    const { getByText, getByLabelText } = render(<Checkbox {...props} />)
    const label = getByText(props.label)
    const checkbox = getByLabelText(props.label) as HTMLInputElement

    userEvent.click(label!)

    expect(props.onChange).toHaveBeenCalledTimes(1)
    expect(checkbox.checked).toBeTruthy()
  })

  it('handles onChange', () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label',
      checked: true,
      onChange: jest.fn()
    }

    const { getByLabelText } = render(<Checkbox {...props} />)
    const checkbox = getByLabelText(props.label) as HTMLInputElement

    userEvent.click(checkbox!)

    expect(props.onChange).toHaveBeenCalledTimes(1)
    expect(checkbox.checked).toBeTruthy()
  })

  it('handles onKeyDown', async () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label',
      checked: true,
      onKeyDown: jest.fn()
    }

    const { getByLabelText } = render(<Checkbox {...props} />)
    const checkbox = getByLabelText(props.label) as HTMLInputElement

    fireEvent.keyDown(checkbox, { key: 'A' })
    expect(props.onKeyDown).toHaveBeenCalledTimes(1)
  })
})
