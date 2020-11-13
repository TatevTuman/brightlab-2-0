import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
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
    const { container } = render(<Checkbox name={'checkbox'} />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
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

  it('renders no validation error correctly', () => {
    const { container } = render(<Checkbox name={'checkbox'} />)
    const error = container.querySelector('.validation-error')

    expect(error).toBe(null)
  })

  it('renders validation error correctly', () => {
    const props = {
      name: 'checkbox',
      errors: { checkbox: { type: 'required', message: 'Checkbox is required' } }
    }

    const { getByText } = render(<Checkbox {...props} />)
    const error = getByText('Checkbox is required')

    expect(error).toBeInTheDocument()
  })

  it('renders validation error correctly', () => {
    const props = {
      name: 'checkbox',
      errors: { checkbox: { type: 'required', message: 'Checkbox is required' } }
    }

    const { getByText } = render(<Checkbox {...props} />)
    const error = getByText('Checkbox is required')

    expect(error).toBeInTheDocument()
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
})
