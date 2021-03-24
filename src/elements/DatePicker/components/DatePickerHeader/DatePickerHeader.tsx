import React, { memo } from 'react'
import { getMonthName } from '@utils'
import DatePickerArrow from '@images/date-picker-arrow.svg'
import './DatePickerHeader.scss'

interface DatePickerHeaderProps {
  month: number
  year: number
  nextMonth: (e: React.MouseEvent<HTMLDivElement>) => void
  previousMonth: (e: React.MouseEvent<HTMLDivElement>) => void
  disabledMonths: (month: number, year: number) => boolean
}

// Renders the month and year header with arrow controls
// for navigating through months and years

const DatePickerHeader = (props: DatePickerHeaderProps) => {
  const { month, year, nextMonth, previousMonth, disabledMonths } = props

  // Resolve the month name from the CALENDAR_MONTHS object map
  const monthname = getMonthName(month)
  const isPrevMonthDisabled = disabledMonths(Math.max(month - 1, 1), year)
  const isNextMonthDisabled = disabledMonths(Math.min(month + 1, 12), year)

  return (
    <div className={'date-picker-header'}>
      <div className={'date-picker-header-title'}>
        {monthname}, {year}
      </div>
      <nav className={'date-picker-header-nav'}>
        <div
          className={'date-picker-header-nav__prev'}
          data-disabled={isPrevMonthDisabled}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => !isPrevMonthDisabled && previousMonth(e)}
        >
          <DatePickerArrow />
        </div>
        <div
          className={'date-picker-header-nav__next'}
          data-disabled={isNextMonthDisabled}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => !isNextMonthDisabled && nextMonth(e)}
        >
          <DatePickerArrow />
        </div>
      </nav>
    </div>
  )
}

export default memo(DatePickerHeader)
