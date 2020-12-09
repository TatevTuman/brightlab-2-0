import React from 'react'
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Autocomplete, Select } from '@components'
import { TestOptionValue } from '@types'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Select', () => {
  const testOptions = [
    { label: 'User', value: { test: 'user' } },
    { label: 'Admin', value: { test: 'admin' } }
  ]

  const props = {
    name: 'select',
    label: 'Select',
    defaultValue: { test: 'admin' },
    options: testOptions,
    onSelect: jest.fn(),
    useFormMethods: {}
  }

  it('renders correctly', async () => {
    const { container, getByText, getByLabelText } = render(<Select<TestOptionValue> {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()

    testOptions.forEach(({ label }) => {
      expect(getByText(label)).toBeInTheDocument()
    })

    const input = getByLabelText(props.label) as HTMLInputElement
    expect(input).toHaveAttribute('data-cursor', 'false')
  })

  it('renders no label correctly', () => {
    const { container } = render(<Select<TestOptionValue> {...props} label={undefined} />)
    const label = container.querySelector('label') || null

    expect(label).toBe(null)
  })

  it('renders label correctly', () => {
    const { getByText } = render(<Select<TestOptionValue> {...props} />)

    expect(getByText(props.label)).toBeInTheDocument()
  })

  it('renders required label correctly', () => {
    const { getByText } = render(
      <Select<TestOptionValue> {...props} useFormMethods={{ validation: { required: true } }} />
    )
    const label = getByText(props.label)

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('data-required', 'true')
  })

  it('renders validation error correctly', () => {
    const { getByText } = render(
      <Select<TestOptionValue>
        {...props}
        useFormMethods={{ errors: { select: { type: 'required', message: 'Select is required' } } }}
      />
    )

    const error = getByText('Select is required')
    expect(error).toBeInTheDocument()
  })

  it('renders no validation error correctly', () => {
    const { container } = render(<Select<TestOptionValue> {...props} />)
    const error = container.querySelector('.validation-error')

    expect(error).toBe(null)
  })

  it('renders default value correctly', () => {
    const { getByLabelText } = render(<Select<TestOptionValue> {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('Admin')
  })

  it('renders default value correctly if component is uncontrolled', () => {
    const { getByLabelText } = render(
      <Select<TestOptionValue> {...props} value={{ test: 'user' }} onSelect={undefined} />
    )
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('Admin')
  })

  it('renders value correctly', async () => {
    const { getByLabelText } = render(
      <Select<TestOptionValue> {...props} value={{ test: 'user' }} defaultValue={undefined} />
    )
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('User')
  })

  it('renders value correctly if component is controlled', () => {
    const { getByLabelText } = render(<Select<TestOptionValue> {...props} value={{ test: 'user' }} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('User')
  })

  it('renders disabled correctly', async () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()

    const { getByLabelText, rerender } = render(
      <Select<TestOptionValue> {...props} disabled={true} onFocus={onFocus} onBlur={onBlur} />
    )

    const select = getByLabelText(props.label) as HTMLInputElement

    userEvent.tab()
    expect(onFocus).toHaveBeenCalledTimes(0)

    userEvent.tab()
    expect(onBlur).toHaveBeenCalledTimes(0)

    expect(select).toHaveAttribute('data-disabled', 'true')

    rerender(<Select<TestOptionValue> {...props} disabled={false} />)

    expect(select).toHaveAttribute('data-disabled', 'false')
  })

  it('handles uncontrolled select', async () => {
    const { getByText, getByLabelText } = render(<Select<TestOptionValue> {...props} onSelect={undefined} />)
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
    const { getByText, getByLabelText } = render(<Select<TestOptionValue> {...props} />)
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
    const { getByLabelText } = render(<Select<TestOptionValue> {...props} onSelect={undefined} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('Admin')

    /* Simulate backspace key down */
    act(() => {
      fireEvent.keyDown(input, { key: 'Backspace' })
    })

    /* Select value check */
    expect(input.value).toBe('')
  })

  it('handles controlled backspace', async () => {
    const { getByLabelText, rerender } = render(<Select<TestOptionValue> {...props} value={{ test: 'user' }} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('User')

    /* Simulate backspace key down */
    act(() => {
      fireEvent.keyDown(input, { key: 'Backspace' })
    })

    expect(props.onSelect).toHaveBeenCalledTimes(1)

    /* Simulate rerender with null */
    rerender(<Select<TestOptionValue> {...props} value={null} />)

    /* Select value check */
    expect(input.value).toBe('')
  })

  it('handles focus/blur', async () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()

    render(<Select<TestOptionValue> {...props} onFocus={onFocus} onBlur={onBlur} />)

    /* Simulate tab */
    userEvent.tab()
    expect(onFocus).toHaveBeenCalledTimes(1)

    /* After state is updated */
    setTimeout(() => {
      /* Simulate tab */
      userEvent.tab()
      expect(onBlur).toHaveBeenCalledTimes(1)
    }, 100)

    jest.runOnlyPendingTimers()
  })

  it('sets from value and triggers validation after select', async () => {
    const setValue = jest.fn()
    const trigger = jest.fn()

    const { getByText } = render(<Select<TestOptionValue> {...props} useFormMethods={{ setValue, trigger }} />)
    const adminOption = await waitFor(() => getByText('Admin'))

    /* Simulate click */
    userEvent.click(adminOption)

    /* SetValue check */
    expect(setValue).toHaveBeenCalledTimes(1)
    /* Trigger check */
    expect(trigger).toHaveBeenCalledTimes(1)
  })

  it('triggers validation after blur', async () => {
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

  it('has no change handler', async () => {
    const { getByLabelText } = render(<Select<TestOptionValue> {...props} />)
    const input = getByLabelText(props.label) as HTMLInputElement

    expect(input.value).toBe('Admin')

    /* User event type clicks before typing */
    userEvent.type(input, 'Test', { skipClick: true })

    expect(input.value).toBe('Admin')
  })

  it('opens dropdown after focus with timeout', async () => {
    const { getByTestId } = render(<Select<TestOptionValue> {...props} />)
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

  // TODO disabled tests
})
