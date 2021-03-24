import React, { memo, useEffect, useState } from 'react'
import { getNextMonth, getPreviousMonth, isSameDay } from '@utils'
import { DatePickerHeader, DatePickerDaysLabels, DatePickerDays } from './components'
import './DatePicker.scss'

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date) => void
  onMonthChange?: (month: number) => void
  onYearChange?: (year: number) => void
  disabledMonths?: (month: number, year: number) => boolean
  disabledDays?: (day: Date) => boolean
  noToday?: boolean
}

export interface DatePickerState {
  date: Date
  month: number
  year: number
  today?: Date
}

const DatePicker: React.FC<DatePickerProps> = props => {
  const {
    date = new Date(),
    onDateChange,
    onMonthChange,
    onYearChange,
    disabledMonths = () => false,
    disabledDays = () => false,
    noToday
  } = props

  const getDayState = (date: Date) => ({
    date,
    month: +date.getMonth() + 1,
    year: date.getFullYear(),
    today: !noToday ? new Date() : undefined
  })

  const [state, handleState] = useState<DatePickerState>(getDayState(date))
  const setState = (nextState: Partial<DatePickerState>) => handleState({ ...state, ...nextState })

  useEffect(() => {
    /*
      This is a day timer that is set to automatically update today state property to the next day when the current day is over.
    */
    if (!noToday) {
      const now = new Date()
      const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const ms = tomorrow - now

      const dayTimeout = setTimeout(() => {
        setState({ today: new Date() })
      }, ms)

      return () => clearTimeout(dayTimeout)
    }
  })

  useEffect(() => {
    onMonthChange && onMonthChange(state.month)
  }, [state.month])

  useEffect(() => {
    onYearChange && onYearChange(state.year)
  }, [state.year])

  const gotoDate = (date: Date) => {
    const nextState = getDayState(date)
    const isToday = !(state.date && isSameDay(date, state.date))

    if (isToday) {
      setState(nextState)
      onDateChange && onDateChange(date)
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
    <div className={'date-picker'}>
      <DatePickerHeader
        nextMonth={nextMonth}
        previousMonth={previousMonth}
        disabledMonths={disabledMonths}
        {...state}
      />
      <DatePickerDaysLabels />
      <DatePickerDays {...state} gotoDate={gotoDate} disabledDays={disabledDays} />
    </div>
  )
}

export default memo(DatePicker)
