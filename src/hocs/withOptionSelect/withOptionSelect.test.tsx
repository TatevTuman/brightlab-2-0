import React from 'react'
import { render, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import withOptionSelect from './withOptionSelect'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('withOptionSelect', () => {
  const WithOptionSelectComponent = withOptionSelect(props => {
    const { selectedOption, handleOptionSelect, options } = props

    return (
      <div data-testid={'with-option-select-component'}>
        <div>{selectedOption?.value}</div>
        {options.map(option => {
          return (
            <div
              key={option.value}
              className={'with-option-select-component-option'}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </div>
          )
        })}
      </div>
    )
  })

  const props = {
    options: [{ label: 'Test', value: 'test' }],
    onChange: jest.fn(),
    value: null
  }

  it('renders correctly', async () => {
    const { container } = render(<WithOptionSelectComponent {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })

  it('renders options correctly', async () => {
    const { container } = render(<WithOptionSelectComponent {...props} />)
    await waitFor(() => container)

    const options = container.querySelectorAll('.with-option-select-component-option')
    expect(options).toHaveLength(props.options.length)
  })

  it('renders value correctly', async () => {
    const { container, getByText } = render(<WithOptionSelectComponent {...props} value={props.options[0].value} />)
    await waitFor(() => container)

    expect(getByText(props.options[0].value)).toBeInTheDocument()
  })

  it('handles onChange', async () => {
    const { container, getByText } = render(<WithOptionSelectComponent {...props} />)
    await waitFor(() => container)

    const optionLabel = getByText(props.options[0].label)

    act(() => {
      userEvent.click(optionLabel)
    })

    const optionValue = getByText(props.options[0].value)

    expect(optionValue).toBeInTheDocument()
    expect(props.onChange).toHaveBeenCalledWith(props.options[0].value)
  })
})
