import React, { memo } from 'react'
import cls from 'classnames'
import { datepicker, getDateISO, isSameDay, isSameMonth } from '~utils'
import { ClassName } from '~types'
import { DatePickerVariantType } from '../DatePicker'

type DatePickerDayType = 'today' | 'selected' | 'disabled' | 'range' | 'out'

const datePickerDayPrimaryTodayVariant = 'bg-violet-3'
const datePickerDayPrimarySelectVariant = 'bg-violet-2'
const datePickerDayPrimaryDisabledVariant = 'bg-neutral-9 text-neutral-5'
const datePickerDayPrimaryRangeVariant = 'bg-violet-1'
const datePickerDayPrimaryOutVariant = 'text-neutral-5'

const datePickerDayBaseVariant =
  'flex items-center justify-center p-5 cursor-pointer select-none rounded-6 text-14 transition-colors'
const datePickerDayPrimaryVariant = 'text-neutral-1 hover:bg-violet-1'

const getDatePickerDayVariantClass = (variant: DatePickerVariantType, type?: DatePickerDayType) => {
  const variants = {
    primary: datePickerDayPrimaryVariant
  }

  const typeVariants = {
    primary: {
      today: datePickerDayPrimaryTodayVariant,
      selected: datePickerDayPrimarySelectVariant,
      disabled: datePickerDayPrimaryDisabledVariant,
      range: datePickerDayPrimaryRangeVariant,
      out: datePickerDayPrimaryOutVariant
    }
  }

  return cls(datePickerDayBaseVariant, variants[variant], type && typeVariants[variant][type])
}

export interface DatePickerDayProps {
  variant?: DatePickerVariantType
  index: number
  day: Date
  dates: (Date | null)[]
  month: number
  year: number
  today?: Date
  gotoDate: (date: Date) => void
  disabledDays?: (day: Date) => boolean
  rangedDays?: (day: Date) => boolean
}

const DatePickerDay: React.FC<DatePickerDayProps> = memo(props => {
  const { variant = 'primary', index, day, dates, month, year, today, gotoDate, disabledDays, rangedDays } = props

  const findCurrentDayInDates = () => dates.find(date => date && isSameDay(day, date))

  /* ClassName + space for extra class */
  let type

  // Check if calendar date is same day as today
  const isToday = today && isSameDay(day, today)

  // Check if calendar date is same day as currently selected date
  const isCurrent = findCurrentDayInDates()

  // Check days oin range logic
  const isInRange = rangedDays && rangedDays(day)

  // Check if calendar date is in the same month as the state month and year
  const isInMonth = month && year && isSameMonth(day, new Date([year, month, 1].join('-')))

  // Check disabled days
  const isDisabled = disabledDays && disabledDays(day)

  if (isToday) {
    type = 'today'
  }

  if (isCurrent) {
    type = 'selected'
  }

  if (isDisabled) {
    type = 'disabled'
  }

  if (isInRange && !isDisabled && isInMonth) {
    type = 'range'
  }

  if (!isInMonth && !isDisabled) {
    type = 'out'
  }

  const style = {
    gridColumn: `(${index} % 7) + 1 / span 1`
  }

  return (
    <div
      className={getDatePickerDayVariantClass(variant, type as DatePickerDayType)}
      style={style}
      onClick={() => !isDisabled && gotoDate(day)}
    >
      {props.children}
    </div>
  )
})

DatePickerDay.displayName = 'DatePickerDay'

const datePickerDaysBaseVariant = 'grid grid-cols-7 gap-3 px-20'
const datePickerDaysPrimaryVariant = ''

const getDatePickerDaysVariantClass = (variant: DatePickerVariantType, className?: ClassName) => {
  return cls(className, datePickerDaysBaseVariant, {
    [`${datePickerDaysPrimaryVariant}`]: !variant || variant === 'primary'
  })
}

export interface DatePickerDaysProps {
  className?: ClassName
  variant?: DatePickerVariantType
  dates: Date[]
  month: number
  year: number
  today?: Date
  gotoDate: (date: Date) => void
  disabledDays?: (day: Date) => boolean
  rangedDays?: (day: Date) => boolean
}

// Render a calendar date as returned from the calendar builder function
// This method is used as a map callback as seen here
const DatePickerDays: React.FC<DatePickerDaysProps> = props => {
  const { className, variant = 'primary', month, year } = props
  const calendar = datepicker(month, year)

  return (
    <div className={getDatePickerDaysVariantClass(variant, className)}>
      {calendar.map((date: (string | number)[], index) => {
        const day = new Date(date.join('-'))

        return (
          <DatePickerDay variant={variant} key={getDateISO(day)} day={day} index={index} {...props}>
            {day.getDate()}
          </DatePickerDay>
        )
      })}
    </div>
  )
}

export default memo(DatePickerDays)
