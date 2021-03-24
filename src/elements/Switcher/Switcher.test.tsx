import React from 'react'
import { render, cleanup, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OptionType } from '@types'

import Switcher from './Switcher'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Switcher', () => {
  const options: OptionType[] = new Array(3).fill(0).map((_, index) => {
    return {
      label: 'test-' + (index + 1),
      value: (index + 1).toString()
    }
  })

  const props = {
    options,
    value: '1',
    onClick: jest.fn()
  }

  it('renders correctly with props', async () => {
    const { container } = render(<Switcher {...props} />)
    expect(container).toMatchSnapshot()
  })

  it('renders correctly label and value', async () => {
    const { getByText } = render(<Switcher {...props} />)

    options.forEach(({ label }) => {
      expect(getByText(label)).toBeInTheDocument()
    })
  })

  it('data-active have current value if the props value matches the value of the first switch', async () => {
    const { getByText } = render(<Switcher {...props} />)

    const firstSwitch = getByText('test-1') as HTMLElement
    expect(firstSwitch).toHaveAttribute('data-active', 'true')

    const secondSwitch = getByText('test-2') as HTMLElement
    expect(secondSwitch).toHaveAttribute('data-active', 'false')

    const thirdSwitch = getByText('test-3') as HTMLElement
    expect(thirdSwitch).toHaveAttribute('data-active', 'false')
  })

  it('click', async () => {
    const { getByText } = render(<Switcher {...props} />)
    const firstSwitch = getByText('test-1') as HTMLElement

    expect(firstSwitch).toHaveAttribute('data-active', 'true')

    act(() => {
      userEvent.click(firstSwitch!)
    })

    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
