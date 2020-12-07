import React from 'react'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderHook } from '@testing-library/react-hooks'
import { useForm } from 'react-hook-form'
import { Autocomplete } from '@components'
import { TestOptionValue } from '@types'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Autocomplete', () => {
  const testOptions = [
    { label: 'User', value: { test: 'user' } },
    { label: 'Admin', value: { test: 'admin' } }
  ]

  const props = {
    name: 'autocomplete',
    label: 'Autocomplete',
    defaultValue: { test: 'admin' },
    options: testOptions,
    onSelect: jest.fn(),
    useFormMethods: {}
  }

  it('renders correctly', async () => {
    const { container, getByText, getByLabelText } = render(<Autocomplete<TestOptionValue> {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()

    testOptions.forEach(({ label }) => {
      expect(getByText(label)).toBeInTheDocument()
    })

    const input = getByLabelText(props.label) as HTMLInputElement
    expect(input).toHaveAttribute('data-cursor', 'true')
  })

  it('renders no label correctly', () => {
    const { container } = render(<Autocomplete<TestOptionValue> {...props} label={undefined} />)
    const label = container.querySelector('label') || null

    expect(label).toBe(null)
  })

  it('renders label correctly', () => {
    const { getByText } = render(<Autocomplete<TestOptionValue> {...props} />)

    expect(getByText(props.label)).toBeInTheDocument()
  })

  it('renders required label correctly', () => {
    const { getByText } = render(
      <Autocomplete<TestOptionValue> {...props} useFormMethods={{ validation: { required: true } }} />
    )
    const label = getByText(props.label)

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('data-required', 'true')
  })

  it('renders validation error correctly', () => {
    const { getByText } = render(
      <Autocomplete<TestOptionValue>
        {...props}
        useFormMethods={{ errors: { autocomplete: { type: 'required', message: 'Autocomplete is required' } } }}
      />
    )

    const error = getByText('Autocomplete is required')
    expect(error).toBeInTheDocument()
  })

  it('renders no validation error correctly', () => {
    const { container } = render(<Autocomplete<TestOptionValue> {...props} />)
    const error = container.querySelector('.validation-error')

    expect(error).toBe(null)
  })

  it('renders default value correctly', () => {
    const { getByLabelText } = render(<Autocomplete<TestOptionValue> {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('Admin')
  })

  it('renders default value correctly if component is uncontrolled', () => {
    const { getByLabelText } = render(
      <Autocomplete<TestOptionValue> {...props} value={{ test: 'user' }} onSelect={undefined} />
    )
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('Admin')
  })

  it('renders value correctly', async () => {
    const { getByLabelText } = render(
      <Autocomplete<TestOptionValue> {...props} value={{ test: 'user' }} defaultValue={undefined} />
    )
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('User')
  })

  it('renders value correctly if component is controlled', () => {
    const { getByLabelText } = render(<Autocomplete<TestOptionValue> {...props} value={{ test: 'user' }} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('User')
  })

  it('handles uncontrolled select', async () => {
    const { getByText, getByLabelText } = render(<Autocomplete<TestOptionValue> {...props} onSelect={undefined} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    const userOption = await waitFor(() => getByText('User'))
    const adminOption = await waitFor(() => getByText('Admin'))

    /* Change value check */
    userEvent.click(userOption)
    expect(input.value).toBe('User')
    expect(props.onSelect).toHaveBeenCalledTimes(0)

    /* Change value check */
    userEvent.click(adminOption)
    expect(input.value).toBe('Admin')
    expect(props.onSelect).toHaveBeenCalledTimes(0)
  })

  it('handles controlled select', async () => {
    const { getByText, getByLabelText } = render(<Autocomplete<TestOptionValue> {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    const userOption = await waitFor(() => getByText('User'))
    const adminOption = await waitFor(() => getByText('Admin'))

    /* Change value check */
    userEvent.click(userOption)
    expect(input.value).toBe('User')
    expect(props.onSelect).toHaveBeenCalledTimes(1)

    /* Simulate backspace and autocomplete options */
    userEvent.click(adminOption)
    expect(input.value).toBe('Admin')
    expect(props.onSelect).toHaveBeenCalledTimes(2)
  })

  it('sets form value and triggers validation after select', async () => {
    const setValue = jest.fn()
    const trigger = jest.fn()

    const { getByText } = render(<Autocomplete<TestOptionValue> {...props} useFormMethods={{ setValue, trigger }} />)
    const adminOption = await waitFor(() => getByText('Admin'))

    /* Simulate click */
    userEvent.click(adminOption)

    /* SetValue check */
    expect(setValue).toHaveBeenCalledTimes(1)
    /* Trigger check */
    expect(trigger).toHaveBeenCalledTimes(1)
  })

  it('sets triggers validation after blur', async () => {
    const setValue = jest.fn()
    const trigger = jest.fn()

    render(<Autocomplete<TestOptionValue> {...props} useFormMethods={{ setValue, trigger }} />)

    /* Focus */
    userEvent.tab()

    setTimeout(() => {
      /* SetValue check */
      expect(setValue).toHaveBeenCalledTimes(0)
      /* Trigger check */
      expect(trigger).toHaveBeenCalledTimes(0)
    }, 100)

    jest.runOnlyPendingTimers()

    /* Blur */
    userEvent.tab()

    setTimeout(() => {
      /* SetValue check */
      expect(setValue).toHaveBeenCalledTimes(0)
      /* Trigger check */
      expect(trigger).toHaveBeenCalledTimes(1)
    }, 100)

    jest.runOnlyPendingTimers()
  })

  it('handles input change', async () => {
    const { getByLabelText } = render(<Autocomplete<TestOptionValue> {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('Admin')

    /* Simulate backspace key down */
    fireEvent.change(input, { target: { value: 'Admi' } })

    const autocompleteOptions = props.options.filter(({ label }) =>
      label.toLowerCase().includes(input.value.toLowerCase())
    )

    expect(input.value).toBe('Admi')
    expect(autocompleteOptions).toHaveLength(1)
    expect(autocompleteOptions[0]).toBeTruthy()
    expect(autocompleteOptions[1]).toBeUndefined()
  })

  it('handles select focus with timeout', async () => {
    const { getByTestId } = render(<Autocomplete<TestOptionValue> {...props} />)
    const list = await waitFor(() => getByTestId('dropdown'))

    /* No focus check */
    expect(list).toHaveAttribute('data-opened', 'false')

    /* Simulate tab */
    userEvent.tab()

    /* No focus after 50ms check */
    setTimeout(() => {
      expect(list).toHaveAttribute('data-opened', 'false')
    }, 50)

    /* Focus after 100ms check */
    setTimeout(() => {
      expect(list).toHaveAttribute('data-opened', 'true')
    }, 100)

    /* run timers */
    jest.runOnlyPendingTimers()

    /* Simulate tab */
    userEvent.tab()

    /* No focus after 50ms check */
    setTimeout(() => {
      expect(list).toHaveAttribute('data-opened', 'true')
    }, 50)

    /* Focus after 100ms check */
    setTimeout(() => {
      expect(list).toHaveAttribute('data-opened', 'false')
    }, 100)

    /* run timers */
    jest.runOnlyPendingTimers()
  })
})
