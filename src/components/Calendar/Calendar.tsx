import React, { useEffect, useState } from 'react'
import { getNextMonth, getPreviousMonth, isSameDay } from '@utils'
import { CalendarHeader, CalendarDaysLabels, CalendarDays } from './components'
import styles from './Calendar.module.scss'

export interface CalendarProps {
  date?: Date
  onDateChanged: (date: Date) => void
}

export interface CalendarState {
  current: Date
  month: number
  year: number
  today: Date
}

const Calendar: React.FC<CalendarProps> = props => {
  const { date = new Date(), onDateChanged } = props

  const getDayState = (date: Date) => ({
    current: date,
    month: +date.getMonth() + 1,
    year: date.getFullYear(),
    today: new Date()
  })

  const [state, handleState] = useState<CalendarState>(getDayState(date))
  const setState = (nextState: Partial<CalendarState>) => handleState({ ...state, ...nextState })
  const { current } = state

  useEffect(() => {
    const now = new Date()
    const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ms = tomorrow - now

    /*
      This is a day timer that is set to automatically update today state property to the next day when the current day is over.
    */
    const dayTimeout = setTimeout(() => {
      setState({ today: new Date() })
    }, ms)

    return () => clearTimeout(dayTimeout)
  })

  const gotoDate = (date: Date) => {
    const nextState = getDayState(date)
    const isToday = !(current && isSameDay(date, current))

    if (isToday) {
      setState(nextState)
      onDateChanged && onDateChanged(date)
    }
  }

  const gotoPreviousMonth = () => {
    const { month, year } = state
    setState(getPreviousMonth(month, year))
  }

  const gotoNextMonth = () => {
    const { month, year } = state
    setState(getNextMonth(month, year))
  }

  const gotoPreviousYear = () => {
    const { year } = state
    setState({ year: year - 1 })
  }

  const gotoNextYear = () => {
    const { year } = state
    setState({ year: year + 1 })
  }

  const previousMonth = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    return e.shiftKey ? gotoPreviousYear() : gotoPreviousMonth()
  }

  const nextMonth = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    return e.shiftKey ? gotoNextYear() : gotoNextMonth()
  }

  return (
    <div className={styles.calendar}>
      <CalendarHeader nextMonth={nextMonth} previousMonth={previousMonth} {...state} />
      <div className={styles.calendarGrid}>
        <CalendarDaysLabels />
        <CalendarDays {...state} gotoDate={gotoDate} />
      </div>
    </div>
  )
}

export default Calendar
