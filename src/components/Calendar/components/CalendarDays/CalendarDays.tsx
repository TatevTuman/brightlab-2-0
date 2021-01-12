import React from 'react'
import { calendar, getDateISO, isSameDay, isSameMonth } from '@utils'
import { CalendarState } from '../../Calendar'
import styles from './CalendarDays.module.scss'

interface CalendarDayProps extends CalendarState {
  day: Date
  index: number
  gotoDate: (date: Date) => void
}

const CalendarDay: React.FC<CalendarDayProps> = props => {
  const { day, today, current, month, year, index, gotoDate } = props

  /* ClassName + space for extra class */
  let className = styles.calendarDay + ' '

  // Check if calendar date is same day as today
  const isToday = isSameDay(day, today)

  // Check if calendar date is same day as currently selected date
  const isCurrent = current && isSameDay(day, current)

  if (isToday) {
    className += styles.calendarDay__today + ' '
  }

  if (isCurrent) {
    className += styles.calendarDay__selected + ' '
  }

  // Check if calendar date is in the same month as the state month and year
  const inMonth = month && year && isSameMonth(day, new Date([year, month, 1].join('-')))
  const style = {
    gridColumn: `(${index} % 7) + 1 / span 1`
  }

  const order = index + 1
  const rows = 6
  const columns = 7
  const grid = rows * columns

  /* Calculations to determine cells side and apply styles for them */
  const isTopRowCell = order <= columns
  const isBottomRowCell = grid - columns < order
  const isLeftColumnCell = order % columns === 1
  const isRightColumnCell = order % columns === 0
  console.log('order', order)

  let side = ''

  if (isTopRowCell) side = 'top'
  else if (isBottomRowCell) side = 'bottom'
  else if (isLeftColumnCell) side = 'left'
  else if (isRightColumnCell) side = 'right'

  return (
    <div className={className} style={style} onClick={() => gotoDate(day)} data-side={side} data-inner={!side}>
      {props.children}
    </div>
  )
}

interface CalendarDaysProps extends CalendarState {
  gotoDate: (date: Date) => void
}

// Render a calendar date as returned from the calendar builder function
// This method is used as a map callback as seen here
const CalendarDays: React.FC<CalendarDaysProps> = props => {
  const { current, month, year } = props
  const calendarMonth = month || +current.getMonth() + 1
  const calendarYear = year || current.getFullYear()

  const dates = calendar(calendarMonth, calendarYear)

  return (
    <div className={styles.calendarDays}>
      {dates.map((date: (string | number)[], index) => {
        const day = new Date(date.join('-'))

        // const props = { index, inMonth, onClick, title: day.toDateString() }

        return (
          <CalendarDay key={getDateISO(day)} day={day} index={index} {...props}>
            {day.getDate()}
          </CalendarDay>
        )
      })}
    </div>
  )
}

export default CalendarDays
