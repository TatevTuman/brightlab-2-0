import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkbox from './Checkbox'

jest.mock('../ValidationErrorMessage/ValidationErrorMessage.tsx')

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Checkbox', () => {
  it('renders correctly', async () => {
    const { container } = render(<Checkbox name={'checkbox'} />)
    expect(container).toMatchSnapshot()
  })

  it('renders no label correctly', () => {
    const { container } = render(<Checkbox name={'checkbox'} />)

    const label = container.querySelector('label')?.querySelector('label')

    expect(label).toBe(null)
  })

  it('renders label correctly', () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label'
    }

    const { getByText } = render(<Checkbox {...props} />)

    expect(getByText(props.label)).toBeInTheDocument()
  })

  it('renders required label correctly', () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label',
      validation: { required: true }
    }

    const { getByText } = render(<Checkbox {...props} />)
    const label = getByText(props.label)

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('data-required', 'true')
  })

  it('change on label', () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label',
      onChange: jest.fn()
    }

    const { getByText, getByLabelText } = render(<Checkbox {...props} />)
    const label = getByText(props.label)
    const checkbox = getByLabelText(props.label) as HTMLInputElement

    userEvent.click(label!)

    expect(props.onChange).toHaveBeenCalledTimes(1)
    expect(checkbox.checked).toBeTruthy()
  })

  it('change', () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label',
      onChange: jest.fn()
    }

    const { getByLabelText } = render(<Checkbox {...props} />)
    const checkbox = getByLabelText(props.label) as HTMLInputElement

    userEvent.click(checkbox!)

    expect(props.onChange).toHaveBeenCalledTimes(1)
    expect(checkbox.checked).toBeTruthy()
  })

  it('onkeydown', async () => {
    const props = {
      name: 'checkbox',
      label: 'checkbox label'
    }

    const { getByText, getByLabelText } = render(<Checkbox {...props} />)
    const label = getByText(props.label)
    const checkbox = getByLabelText(props.label) as HTMLInputElement

    userEvent.tab()

    fireEvent.keyDown(label, { key: 'Tab' })
    expect(checkbox.checked).toBeFalsy()

    fireEvent.keyDown(label, { key: 'Esc' })
    expect(checkbox.checked).toBeFalsy()

    fireEvent.keyDown(label, { key: 'Enter' })

    expect(checkbox.checked).toBeTruthy()
  })
})
