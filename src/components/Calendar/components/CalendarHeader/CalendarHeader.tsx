import React from 'react'
import { CALENDAR_MONTHS } from '@utils'
import { CalendarState } from '../../Calendar'
import MonthArrow from '@images/arrow.svg'
import './CalendarHeader.scss'

interface CalendarHeaderProps extends CalendarState {
  nextMonth: (e: React.MouseEvent<HTMLOrSVGElement>) => void
  previousMonth: (e: React.MouseEvent<HTMLOrSVGElement>) => void
}

// Renders the month and year header with arrow controls
// for navigating through months and years

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { month, year, nextMonth, previousMonth } = props

  // Resolve the month name from the CALENDAR_MONTHS object map
  const monthname = Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))]

  return (
    <div className={'calendar-header'}>
      <MonthArrow className={'calendar-header__prev'} onClick={previousMonth} />
      <div className={'calendarHeaderMonth'}>
        {monthname} {year}
      </div>
      <MonthArrow className={'calendar-header__next'} onClick={nextMonth} />
    </div>
  )
}

export default CalendarHeader
