import React, { memo, useEffect, useState } from 'react'
import cls from 'classnames'
import { getNextMonth, getPreviousMonth } from '~utils'
import { DatePickerHeader, DatePickerDaysLabels, DatePickerDays } from './components'
import { Children, ClassName } from '~types'

export type DatePickerVariantType = 'primary'

const datePickerBaseVariant = 'py-20 border rounded-8 shadow-drop active-ring'
const datePickerPrimaryVariant = 'border-neutral-9 bg-neutral-13'

const getDatePickerVariantClass = (variant: DatePickerVariantType, className?: ClassName) => {
  return cls(className, datePickerBaseVariant, { [`${datePickerPrimaryVariant}`]: !variant || variant === 'primary' })
}

export interface DatePickerProps {
  className?: ClassName
  variant?: DatePickerVariantType
  dates: (Date | null)[]
  initialStateDate?: Date
  noToday?: boolean
  onDateChange: (dates: Date[], date: Date) => void
  onMonthChange?: (month: number, year: number) => void
  disabledMonths?: (month: number, year: number) => boolean
  disabledDays?: (day: Date) => boolean
  rangedDays?: (day: Date) => boolean
  rightPanel?: Children
}

export interface DatePickerState {
  month: number
  year: number
  today?: Date
}

const DatePicker: React.FC<DatePickerProps> = props => {
  const {
    dates,
    className,
    variant = 'primary',
    initialStateDate,
    noToday,
    onDateChange,
    onMonthChange,
    disabledMonths = () => false,
    disabledDays = () => false,
    rangedDays = () => false,
    rightPanel
  } = props

  const now = new Date()

  /* Needs to define what date to change */
  const [dateId, handleDateId] = useState<number>(0)

  const nextDateId = () => {
    const nextId = dateId + 1
    const datesLength = dates.length - 1

    if (nextId > datesLength) handleDateId(0)
    else handleDateId(nextId)
  }

  const setDatePickerDate = (date: Date) => {
    /* Get next dates */
    const nextDatePickerDates = dates.map((datePickerDate, index) => {
      if (index === dateId) return date
      else return datePickerDate
    })

    onDateChange(nextDatePickerDates as Date[], date)

    /* Change date id to get next date */
    nextDateId()
    /* Changes month and year by that date */
    setDatePickerState(getDatePickerState(date))
  }

  const datePickerDatesTimes = dates.map(date => (date ? date.getTime() : now.getTime()))

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

  useEffect(setStateTodayObserverEffect, [])

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
    <div className={getDatePickerVariantClass(variant, className)}>
      <DatePickerHeader
        variant={variant}
        month={datePickerState.month}
        year={datePickerState.year}
        nextMonth={nextMonth}
        previousMonth={previousMonth}
        disabledMonths={disabledMonths}
      />
      <div className={cls('flex')}>
        <div
          className={cls('border-r', {
            'w-full': !rightPanel,
            'w-45%': rightPanel,
            'border-neutral-9': !variant || variant === 'primary'
          })}
        >
          <DatePickerDaysLabels variant={variant} />
          <DatePickerDays
            {...datePickerState}
            variant={variant}
            dates={dates as Date[]}
            gotoDate={gotoDate}
            disabledDays={disabledDays}
            rangedDays={rangedDays}
          />
        </div>
        {rightPanel}
      </div>
    </div>
  )
}

export default memo(DatePicker)
