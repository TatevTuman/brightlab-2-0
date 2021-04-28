import React, { memo, useEffect, useState } from 'react'
import { getNextMonth, getPreviousMonth } from '@utils'
import { DatePickerHeader, DatePickerDaysLabels, DatePickerDays } from './components'
import './DatePicker.scss'

export interface DatePickerProps {
  dates?: (Date | null)[]
  className?: string
  noToday?: boolean
  initialStateDate?: Date
  onDateChange?: (dates: (Date | null)[], date: Date) => void
  onMonthChange?: (month: number, year: number) => void
  disabledMonths?: (month: number, year: number) => boolean
  disabledDays?: (day: Date) => boolean
  rangedDays?: (day: Date) => boolean
}

export interface DatePickerState {
  month: number
  year: number
  today?: Date
}

const DatePicker: React.FC<DatePickerProps> = props => {
  const {
    className,
    noToday,
    initialStateDate,
    onDateChange,
    onMonthChange,
    disabledMonths = () => false,
    disabledDays = () => false,
    rangedDays = () => false
  } = props

  const now = new Date()
  const dates = props.dates || [now]

  /* Needs to define what date to change */
  const [dateId, handleDateId] = useState<number>(0)
  const nextDateId = () => {
    const nextId = dateId + 1
    const datesLength = dates.length - 1

    if (nextId > datesLength) handleDateId(0)
    else handleDateId(nextId)
  }

  /* Checks if date picker is controlled by dates from props */
  const isDatePickerControlled = props.dates !== undefined

  const [datePickerDates, handleDatePickerDates] = useState<(Date | null)[]>(dates)
  const setDatePickerDate = (date: Date) => {
    /* Get next dates */
    const nextDatePickerDates = datePickerDates.map((datePickerDate, index) => {
      if (index === dateId) return date
      else return datePickerDate
    })

    /* If controlled on change else change state */
    if (isDatePickerControlled) {
      onDateChange && onDateChange(nextDatePickerDates, date)
    } else {
      handleDatePickerDates(nextDatePickerDates)
    }

    /* Change date id to get next date */
    nextDateId()
    /* Changes month and year by that date */
    setDatePickerState(getDatePickerState(date))
  }

  const datePickerDatesTimes = datePickerDates.map(date => (date ? date.getTime() : now.getTime()))

  const minDate = new Date(Math.min(...datePickerDatesTimes))
  const maxDate = new Date(Math.max(...datePickerDatesTimes))

  /* Returns state from dates */
  const getDatePickerState = (date: Date) => ({
    month: +date.getMonth() + 1,
    year: date.getFullYear(),
    today: !noToday ? new Date() : undefined
  })

  /* For RangeDatePicker, we add 1 month to the second picker, so we need get endDate(maxDate) as initial state */
  const initialState = getDatePickerState(initialStateDate || minDate)

  const [datePickerState, handleDatePickerState] = useState<DatePickerState>(initialState)
  const setDatePickerState = (nextState: Partial<DatePickerState>) => {
    handleDatePickerState({ ...datePickerState, ...nextState })
  }

  /*
    This is a day timer that is set to automatically update today state property
    to the next day when the current day is over.
  */
  const setStateTodayObserverEffect = () => {
    if (!noToday) {
      const now = new Date()
      const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const ms = tomorrow - now

      const dayTimeout = setTimeout(() => {
        setDatePickerState({ today: new Date() })
      }, ms)

      return () => clearTimeout(dayTimeout)
    }
  }

  /* Set date picker dates if new dates from props arrived */
  const setStateFromPropsValueEffect = () => {
    if (isDatePickerControlled) {
      handleDatePickerDates(props.dates as Date[])
    }
  }

  useEffect(setStateTodayObserverEffect, [])
  useEffect(setStateFromPropsValueEffect, [props.dates])

  const gotoDate = (date: Date) => {
    setDatePickerDate(date)
  }

  const gotoPreviousMonth = () => {
    const previousMonth = getPreviousMonth(datePickerState.month, datePickerState.year)
    onMonthChange && onMonthChange(previousMonth.month, previousMonth.year)
    setDatePickerState(previousMonth)
  }

  const gotoNextMonth = () => {
    const nextMonth = getNextMonth(datePickerState.month, datePickerState.year)
    onMonthChange && onMonthChange(nextMonth.month, nextMonth.year)
    setDatePickerState(getNextMonth(datePickerState.month, datePickerState.year))
  }

  const gotoPreviousYear = () => {
    onMonthChange && onMonthChange(datePickerState.month, datePickerState.year - 1)
    setDatePickerState({ year: datePickerState.year - 1 })
  }

  const gotoNextYear = () => {
    onMonthChange && onMonthChange(datePickerState.month, datePickerState.year + 1)
    setDatePickerState({ year: datePickerState.year + 1 })
  }

  const previousMonth = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    return e.shiftKey ? gotoPreviousYear() : gotoPreviousMonth()
  }

  const nextMonth = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    return e.shiftKey ? gotoNextYear() : gotoNextMonth()
  }

  return (
    <div className={'date-picker ' + className}>
      <DatePickerHeader
        month={datePickerState.month}
        year={datePickerState.year}
        nextMonth={nextMonth}
        previousMonth={previousMonth}
        disabledMonths={disabledMonths}
      />
      <DatePickerDaysLabels />
      <DatePickerDays
        {...datePickerState}
        dates={datePickerDates}
        gotoDate={gotoDate}
        disabledDays={disabledDays}
        rangedDays={rangedDays}
      />
    </div>
  )
}

export default memo(DatePicker)
