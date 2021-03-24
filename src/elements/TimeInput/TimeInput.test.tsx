import React, { useState } from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import TimeInput from './TimeInput'
import userEvent from '@testing-library/user-event'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('TimeInput', () => {
  const props = {
    label: 'test',
    onChange: jest.fn()
  }
  it('renders correctly with props', async () => {
    const { container } = render(<TimeInput {...props} />)
    expect(container).toMatchSnapshot()
  })
  it('renders correctly label', async () => {
    const { getByText } = render(<TimeInput {...props} />)
    expect(getByText(props.label)).toBeInTheDocument()
  })

  it('handles onChange', async () => {
    const { container, rerender } = render(<TimeInput {...props} />)
    const inputs = container.querySelectorAll('input')
    inputs.forEach((input, index) => {
      act(() => {
        userEvent.type(input, index.toString())
      })
      rerender(<TimeInput {...props} />)
    })
    expect(props.onChange).toHaveBeenCalledTimes(5)
  })

  it('focuses by tab', async () => {
    const { container } = render(<TimeInput {...props} />)
    await waitFor(() => container)

    const inputs = container.querySelectorAll('input')
    inputs.forEach((input, index) => {
      act(() => {
        userEvent.tab(input, index.toString())
        expect(input).toHaveFocus()
      })
    })
  })
  it('focuses by type', async () => {
    const { container } = render(<TimeInput {...props} />)
    await waitFor(() => container)
    const inputs = container.querySelectorAll('input')
    inputs.forEach((input, index) => {
      if (index === 0) {
        act(() => {
          userEvent.type(input, index.toString())
          expect(input).toHaveFocus()
        })
      } else if (index === 1) {
        act(() => {
          userEvent.type(input, index.toString())
          expect(input).toHaveFocus()
        })
      }
    })
  })
})
