import React from 'react'
import { act, cleanup, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DatePicker from './DatePicker'
import { getMonthName, getNextMonth, getPreviousMonth } from '@utils'

// beforeAll(() => {})
// afterAll(() => {})
beforeEach(() => {
  cleanup()
  jest.clearAllMocks()
})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('DatePicker', () => {
  it('renders correctly', async () => {
    const props = {
      date: new Date('January 01, 2000 00:00:00'),
      onDateChange: jest.fn(),
      onMonthChange: jest.fn(),
      onYearChange: jest.fn()
    }

    const { container } = render(<DatePicker {...props} />)
    await waitFor(() => container)
    expect(container).toMatchSnapshot()
  })

  it('renders today correctly', async () => {
    const props = {
      date: new Date(),
      onDateChange: jest.fn()
    }

    const { container } = render(<DatePicker {...props} />)
    await waitFor(() => container)

    const today = container.querySelector('div.date-picker-day__today')

    expect(today).toBeInTheDocument()
    expect(today!.innerHTML).toBe(props.date.getDate().toString())
  })

  it('renders noToday correctly', async () => {
    const props = {
      date: new Date(),
      onDateChange: jest.fn(),
      noToday: true
    }

    const { container, getByText } = render(<DatePicker {...props} />)
    await waitFor(() => container)

    const today = getByText(props.date.getDate().toString())

    expect(today).toBeInTheDocument()
    expect(today).not.toHaveClass('date-picker-day__today')
  })

  it('renders days correctly', async () => {
    const props = {
      date: new Date('January 01, 2000 00:00:00'),
      onDateChange: jest.fn(),
      onMonthChange: jest.fn(),
      onYearChange: jest.fn()
    }

    const { container } = render(<DatePicker {...props} />)
    await waitFor(() => container)

    const days = container.querySelectorAll('div.date-picker-day')

    expect(days).toHaveLength(42)
  })

  it('renders selected day correctly', async () => {
    const props = {
      date: new Date(),
      onDateChange: jest.fn()
    }

    const { container } = render(<DatePicker {...props} />)
    await waitFor(() => container)

    const selected = container.querySelector('div.date-picker-day__selected')

    expect(selected).toBeInTheDocument()
    expect(selected!.innerHTML).toBe(props.date.getDate().toString())
  })

  it('renders out month days correctly', async () => {
    const props = {
      date: new Date('January 01, 2000 00:00:00'),
      onDateChange: jest.fn(),
      onMonthChange: jest.fn(),
      onYearChange: jest.fn()
    }

    const { container } = render(<DatePicker {...props} />)
    await waitFor(() => container)

    const days = container.querySelectorAll('div.date-picker-day__out')

    expect(days).toHaveLength(11)

    userEvent.click(days[0])

    expect(props.onDateChange).toHaveBeenCalledTimes(1)
    expect(props.onMonthChange).toHaveBeenCalledTimes(2) // Somehow it has already called once before this test, so + 1
  })

  it('renders disabled days correctly', async () => {
    const props = {
      date: new Date('January 01, 2000 00:00:00'),
      onDateChange: jest.fn(),
      onMonthChange: jest.fn(),
      onYearChange: jest.fn()
    }

    const { container } = render(
      <DatePicker
        {...props}
        disabledDays={(day: Date) => {
          const today = new Date()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return day - today < 0
        }}
      />
    )
    await waitFor(() => container)

    const days = container.querySelectorAll('div.date-picker-day__disabled')

    expect(days).toHaveLength(42)

    days.forEach(day => {
      userEvent.click(day!)

      expect(props.onDateChange).toHaveBeenCalledTimes(0)
    })
  })

  it('renders disabled months correctly', async () => {
    const props = {
      date: new Date('January 01, 2000 00:00:00'),
      onDateChange: jest.fn(),
      onMonthChange: jest.fn(),
      onYearChange: jest.fn()
    }

    const { container } = render(
      <DatePicker
        {...props}
        disabledMonths={(month: number) => {
          return month === 2
        }}
      />
    )
    await waitFor(() => container)

    const nextMonthBtn = container.querySelector('div.date-picker-header-nav__next')

    act(() => {
      userEvent.click(nextMonthBtn!)
    })

    expect(nextMonthBtn).toHaveAttribute('data-disabled', 'true')
    expect(props.onMonthChange).toHaveBeenCalledTimes(1) // Somehow it has already called once before this test, so + 1
  })

  it('clicks on day', async () => {
    const props = {
      date: new Date(),
      onDateChange: jest.fn()
    }

    const { container } = render(<DatePicker {...props} />)
    await waitFor(() => container)

    const day = container.querySelector('div.date-picker-day__out')

    act(() => {
      userEvent.click(day!)
    })

    expect(props.onDateChange).toHaveBeenCalledTimes(1)
  })

  it('navigates between months and years correctly', async () => {
    const props = {
      date: new Date(),
      onDateChange: jest.fn(),
      onMonthChange: jest.fn(),
      onYearChange: jest.fn()
    }

    const { container } = render(<DatePicker {...props} />)
    await waitFor(() => container)

    let datePickerHeaderTitle = container.querySelector('div.date-picker-header-title')

    let currentMonth = props.date.getMonth() + 1
    let currentMonthName = getMonthName(currentMonth)
    let currentYear = props.date.getFullYear()

    const nextMonthBtn = container.querySelector('div.date-picker-header-nav__next')

    new Array(11).fill(0).forEach(() => {
      act(() => {
        userEvent.click(nextMonthBtn!)
      })

      const { month, year } = getNextMonth(currentMonth, currentYear)
      currentMonth = month
      currentMonthName = getMonthName(currentMonth)
      currentYear = year

      datePickerHeaderTitle = container.querySelector('div.date-picker-header-title')
      expect(datePickerHeaderTitle!.innerHTML).toBe(`${currentMonthName}, ${currentYear}`)
    })

    const prevMonthBtn = container.querySelector('div.date-picker-header-nav__prev')

    new Array(11).fill(0).forEach(() => {
      act(() => {
        userEvent.click(prevMonthBtn!)
      })

      const { month, year } = getPreviousMonth(currentMonth, currentYear)
      currentMonth = month
      currentMonthName = getMonthName(currentMonth)
      currentYear = year

      datePickerHeaderTitle = container.querySelector('div.date-picker-header-title')
      expect(datePickerHeaderTitle!.innerHTML).toBe(`${currentMonthName}, ${currentYear}`)
    })
  })
})
