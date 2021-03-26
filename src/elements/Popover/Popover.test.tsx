import React from 'react'
import { act, cleanup, getByText, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Popover from './Popover'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Popover', () => {
  const props = {
    onClick: jest.fn(),
    options: [
      {
        label: {
          name: 'name-1',
          company: 'company-1',
          date: 'date-1'
        },
        value: 'test-1'
      },
      {
        label: {
          name: 'name-2',
          company: 'company-2',
          date: 'date-2'
        },
        value: 'test-2'
      }
    ]
  }
  it('renders correctly', async () => {
    const { container } = render(<Popover {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
  it('render option label correctly', () => {
    const { getByText } = render(<Popover {...props} />)

    props.options.forEach(({ label }) => {
      expect(getByText(label.name)).toBeInTheDocument()
      expect(getByText(label.company)).toBeInTheDocument()
      expect(getByText(label.date)).toBeInTheDocument()
    })
  })
  it('click', async () => {
    const { container } = render(<Popover {...props} />)
    const options = container.querySelectorAll('[key]')
    options.forEach(option => {
      act(() => {
        userEvent.click(option)
        expect(props.onClick).toHaveBeenCalledTimes(1)
      })
    })
  })
})
