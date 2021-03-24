import React, { useEffect, useState } from 'react'
import { DatePickerDays, DatePickerDaysLabels, DatePickerHeader, DatePickerProps } from '@elements'
import { getNextMonth, getPreviousMonth } from '@utils'
import './RangeDatePicker.scss'

export interface RangeDatePickerProps {
  startDate?: Date | null
  endDate?: Date | null
  onDatesChange?: (startDate: Date | null, endDate: Date | null) => void
  onMonthsChange?: (startMonth: number, endMonth: number) => void
  onYearsChange?: (startYear: number, endYear: number) => void
  disabledMonths?: DatePickerProps['disabledMonths']
  disabledDays?: DatePickerProps['disabledDays']
  noToday?: DatePickerProps['noToday']
}

export interface RangeDatePickerState {
  date: Date | null
  month: number
  year: number
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = props => {
  const {
    startDate,
    endDate,
    onDatesChange,
    onMonthsChange,
    onYearsChange,
    disabledMonths = () => false,
    disabledDays = () => false,
    noToday
  } = props

  const defaultStartDate = startDate || new Date()
  const defaultEndDate = endDate || new Date(new Date().setMonth(defaultStartDate!.getMonth() + 1))

  const [startDateState, setStartDateState] = useState<RangeDatePickerState>({
    date: defaultStartDate,
    month: defaultStartDate.getMonth() + 1,
    year: defaultStartDate.getFullYear()
  })

  const [endDateState, setEndDateState] = useState<RangeDatePickerState>({
    date: defaultEndDate,
    month: defaultEndDate.getMonth() + 1,
    year: defaultEndDate.getFullYear()
  })

  const today = !noToday ? new Date() : undefined

  // useEffect(() => {
  //   /*
  //     This is a day timer that is set to automatically update today state property to the next day when the current day is over.
  //   */
  //   if (!noToday) {
  //     const now = new Date()
  //     const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     const ms = tomorrow - now
  //
  //     const dayTimeout = setTimeout(() => {
  //       setState({ today: new Date() })
  //     }, ms)
  //
  //     return () => clearTimeout(dayTimeout)
  //   }
  // })

  useEffect(() => {
    onDatesChange && onDatesChange(startDateState.date, endDateState.date)
  }, [startDateState.date, endDateState.date])

  useEffect(() => {
    onMonthsChange && onMonthsChange(startDateState.month, endDateState.month)
  }, [startDateState.month, endDateState.month])

  useEffect(() => {
    onYearsChange && onYearsChange(startDateState.year, endDateState.year)
  }, [startDateState.year, endDateState.year])

  const gotoPreviousMonth = () => {
    setStartDateState({ ...startDateState, ...getPreviousMonth(startDateState.month, startDateState.year) })
    setEndDateState({ ...endDateState, ...getPreviousMonth(endDateState.month, endDateState.year) })
  }

  const gotoNextMonth = () => {
    setStartDateState({ ...startDateState, ...getNextMonth(startDateState.month, startDateState.year) })
    setEndDateState({ ...endDateState, ...getNextMonth(endDateState.month, endDateState.year) })
  }

  const previousMonth = () => gotoPreviousMonth()
  const nextMonth = () => gotoNextMonth()

  const gotoDate = (date: Date, type: 'start' | 'end') => {
    if (startDateState.date && endDateState.date) {
      if (type === 'start') {
        setStartDateState({ ...startDateState, date })
        setEndDateState({ ...endDateState, date: null })
      } else {
        setStartDateState({ ...startDateState, date: null })
        setEndDateState({ ...endDateState, date })
      }

      return
    }

    if (type === 'start') {
      if (endDateState.date) {
        setStartDateState({ ...startDateState, date })
        return
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (startDateState.date - date > 0) {
        setEndDateState({ ...endDateState, date: startDateState.date })
        setStartDateState({ ...startDateState, date })
        return
      }

      setEndDateState({ ...endDateState, date })
    } else {
      if (startDateState.date) {
        setEndDateState({ ...endDateState, date })
        return
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (endDateState.date - date < 0) {
        setStartDateState({ ...startDateState, date: endDateState.date })
        setEndDateState({ ...endDateState, date })
        return
      }

      setStartDateState({ ...startDateState, date })
    }
  }

  const selectionDays = (day: Date) => {
    if (!startDateState.date || !endDateState.date) return false

    day.setHours(0, 0, 0, 0)
    const isAfterStartDate = day.getTime() > startDateState.date.getTime()

    day.setHours(23, 59, 59, 999)
    const isBeforeEndDate = day.getTime() < endDateState.date.getTime()

    return isAfterStartDate && isBeforeEndDate
  }

  return (
    <div className={'range-date-picker'}>
      <div className={'date-picker range-date-picker__start'}>
        <DatePickerHeader
          nextMonth={nextMonth}
          previousMonth={previousMonth}
          disabledMonths={disabledMonths}
          {...startDateState}
        />
        <DatePickerDaysLabels />
        <DatePickerDays
          {...startDateState}
          secondDate={endDateState.date}
          gotoDate={(date: Date) => gotoDate(date, 'start')}
          disabledDays={(day: Date) => {
            const isOutMonth = day.getMonth() + 1 !== startDateState.month
            return isOutMonth || disabledDays(day)
          }}
          selectionDays={selectionDays}
          today={today}
        />
      </div>
      <div className={'date-picker range-date-picker__end'}>
        <DatePickerHeader
          nextMonth={nextMonth}
          previousMonth={previousMonth}
          disabledMonths={(month, year) => {
            return disabledMonths(month - 1, year)
          }}
          {...endDateState}
        />
        <DatePickerDaysLabels />
        <DatePickerDays
          {...endDateState}
          secondDate={startDateState.date}
          gotoDate={(date: Date) => gotoDate(date, 'end')}
          disabledDays={(day: Date) => {
            const isOutMonth = day.getMonth() + 1 !== endDateState.month
            return isOutMonth || disabledDays(day)
          }}
          selectionDays={selectionDays}
          today={today}
        />
      </div>
    </div>
  )
}

export default RangeDatePicker
