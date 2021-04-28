import React, { useState, memo, useEffect } from 'react'
import { DatePicker, DatePickerProps } from '@elements'
import { addMonths, isDateBetween, getMonth, isSameMonth, getYear } from '@utils'
import './RangeDatePicker.scss'

export interface RangeDatePickerProps extends Omit<DatePickerProps, 'dates' | 'onDateChange'> {
  startDate: Date | null
  endDate: Date | null
  onDatesChange: (startDate: Date | null, endDate: Date | null) => void
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = props => {
  const { disabledDays, disabledMonths, onDatesChange } = props

  const [startDate, setStartDate] = useState<Date | null>(props.startDate)
  const [endDate, setEndDate] = useState<Date | null>(props.endDate)

  const useSetInitialEndDateEffect = () => {
    if (startDate && props.endDate) {
      if (isSameMonth(startDate, props.endDate)) {
        return setEndDate(addMonths(props.endDate, 1))
      }
    }

    if (!startDate || !props.endDate) {
      return setEndDate(addMonths(new Date(), 1))
    }

    setEndDate(props.endDate)
  }

  useEffect(useSetInitialEndDateEffect, [])

  const handleDatePickerDateChange = (_: unknown, changedDate: Date) => {
    /* 1. If no startDate */
    if (!startDate) {
      /* 1A. If changedDate gt endDate, we need to set both dates */
      if (endDate && changedDate > endDate) {
        onDatesChange(endDate, changedDate)
        setStartDate(endDate)
        setEndDate(changedDate)
        return
      }

      /* 1B. Sets startDate */
      onDatesChange(changedDate, endDate)
      setStartDate(changedDate)
      return
    }

    /* 2. If no endDate */
    if (!endDate) {
      /* 2A. If changedDate lt startDate, we need to set both dates */
      if (startDate && changedDate < startDate) {
        onDatesChange(changedDate, startDate)
        setStartDate(changedDate)
        setEndDate(startDate)
        return
      }

      /* 2B. Sets endDate */
      onDatesChange(startDate, changedDate)
      setEndDate(changedDate)
      return
    }

    /* 3. If both dates set the greatest one and reset other */
    if (startDate && endDate) {
      /* 3A. If changedDate gt endDate it must be start date */
      const isStartDate = changedDate > endDate

      if (isStartDate) {
        onDatesChange(changedDate, null)
        setStartDate(changedDate)
        setEndDate(null)
      } else {
        onDatesChange(null, changedDate)
        setStartDate(null)
        setEndDate(changedDate)
      }

      return
    }
  }

  /* Needs to render datepicker with 1 month offset from start */
  const initialStateDate = addMonths(startDate || new Date(), 1)

  const startDisabledMonths = (month: number, year: number) => {
    if (disabledMonths) {
      return disabledMonths(month, year)
    } else {
      return getMonth() < month && getYear() === year
    }
  }

  const endDisabledMonths = (month: number, year: number) => {
    if (disabledMonths) {
      return disabledMonths(month, year)
    } else {
      return getMonth() + 1 > month && getYear() === year
    }
  }

  return (
    <div className={'range-date-picker'}>
      <DatePicker
        className={'range-date-picker__start'}
        dates={[startDate, endDate]}
        onDateChange={handleDatePickerDateChange}
        disabledDays={disabledDays}
        disabledMonths={startDisabledMonths}
        rangedDays={(day: Date) => isDateBetween(day, startDate, endDate)}
      />
      <DatePicker
        className={'range-date-picker__end'}
        dates={[startDate, endDate]}
        initialStateDate={initialStateDate}
        onDateChange={handleDatePickerDateChange}
        disabledDays={disabledDays}
        disabledMonths={endDisabledMonths}
        rangedDays={(day: Date) => isDateBetween(day, startDate, endDate)}
      />
    </div>
  )
}

export default memo(RangeDatePicker)
