import React from 'react'
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()

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

    /* Change value check */
    userEvent.click(adminOption)
    expect(input.value).toBe('Admin')
    expect(props.onSelect).toHaveBeenCalledTimes(2)
  })

  it('handles uncontrolled backspace', async () => {
    const { getByLabelText } = render(<Autocomplete<TestOptionValue> {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('Admin')

    /* Simulate backspace key down */
    act(() => {
      fireEvent.keyDown(input, { key: 'Backspace' })
    })

    /* Select value check */
    expect(input.value).toBe('')
    expect(props.onSelect).toHaveBeenCalledTimes(1)
  })

  it('sets from value and triggers validation after select', async () => {
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

  it('has no change handler', async () => {
    const { getByLabelText } = render(<Autocomplete<TestOptionValue> {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('Admin')

    /* User event type clicks before typing */
    userEvent.type(input, 'Test', { skipClick: true })

    expect(input.value).toBe('Admin')
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
