import React, { memo } from 'react'
import { datepicker, getDateISO, isSameDay, isSameMonth } from '@utils'
import './DatePickerDays.scss'

export interface DatePickerDayProps {
  index: number
  day: Date
  date: Date | null
  secondDate?: Date | null
  month: number
  year: number
  today?: Date
  gotoDate: (date: Date) => void
  disabledDays: (day: Date) => boolean
  selectionDays?: (day: Date) => boolean
}

const DatePickerDay: React.FC<DatePickerDayProps> = memo(props => {
  const { day, today, date, secondDate, month, year, index, gotoDate, disabledDays, selectionDays } = props

  /* ClassName + space for extra class */
  let className = 'date-picker-day' + ' '

  // Check if calendar date is same day as today
  const isToday = today && isSameDay(day, today)

  // Check if calendar date is same day as currently selected date
  const isCurrent = date && isSameDay(day, date)
  const isCurrentSecondDate = secondDate && isSameDay(day, secondDate)

  // Check disabled days
  const isDisabled = disabledDays(day)

  // Check days oin range logic
  const isInRange = selectionDays && selectionDays(day)

  // Check if calendar date is in the same month as the state month and year
  const isInMonth = month && year && isSameMonth(day, new Date([year, month, 1].join('-')))

  if (isToday) {
    className += 'date-picker-day__today' + ' '
  }

  if (isCurrent || isCurrentSecondDate) {
    className += 'date-picker-day__selected' + ' '
  }

  if (isDisabled) {
    className += 'date-picker-day__disabled' + ' '
  }

  if (isInRange && !isDisabled && isInMonth) {
    className += 'date-picker-day__range' + ' '
  }

  if (!isInMonth) {
    className += 'date-picker-day__out' + ' '
  }

  const style = {
    gridColumn: `(${index} % 7) + 1 / span 1`
  }

  return (
    <div className={className} style={style} onClick={() => !isDisabled && gotoDate(day)}>
      {props.children}
    </div>
  )
})

DatePickerDay.displayName = 'DatePickerDay'

export interface DatePickerDaysProps {
  date: Date | null
  secondDate?: Date | null
  month: number
  year: number
  today?: Date
  gotoDate: (date: Date) => void
  disabledDays: (day: Date) => boolean
  selectionDays?: (day: Date) => boolean
}

// Render a calendar date as returned from the calendar builder function
// This method is used as a map callback as seen here
const DatePickerDays: React.FC<DatePickerDaysProps> = props => {
  const { month, year } = props
  const dates = datepicker(month, year)

  return (
    <div className={'date-picker-days'}>
      {dates.map((date: (string | number)[], index) => {
        const day = new Date(date.join('-'))

        return (
          <DatePickerDay key={getDateISO(day)} day={day} index={index} {...props}>
            {day.getDate()}
          </DatePickerDay>
        )
      })}
    </div>
  )
}

export default memo(DatePickerDays)
