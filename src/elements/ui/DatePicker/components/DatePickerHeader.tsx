import React, { memo } from 'react'
import cls from 'classnames'
import { getMonthName } from '~utils'
import * as Icon from '~svg'
import { ClassName } from '~types'
import { DatePickerVariantType } from '../DatePicker'

const datePickerHeaderBaseVariant = 'relative flex items-center justify-between pb-20 px-20 border-b'
const datePickerHeaderPrimaryVariant = 'border-neutral-9'

const getDatePickerHeaderVariantClass = (variant: DatePickerVariantType, className?: ClassName) => {
  return cls(className, datePickerHeaderBaseVariant, {
    [`${datePickerHeaderPrimaryVariant}`]: !variant || variant === 'primary'
  })
}

export interface DatePickerHeaderProps {
  className?: ClassName
  variant?: DatePickerVariantType
  month: number
  year: number
  nextMonth: (e: React.MouseEvent<HTMLDivElement>) => void
  previousMonth: (e: React.MouseEvent<HTMLDivElement>) => void
  disabledMonths: (month: number, year: number) => boolean
}

// Renders the month and year header with arrow controls
// for navigating through months and years

const DatePickerHeader = (props: DatePickerHeaderProps) => {
  const { className, variant = 'primary', month, year, nextMonth, previousMonth, disabledMonths } = props

  // Resolve the month name from the CALENDAR_MONTHS object map
  const monthname = getMonthName(month)
  const isPrevMonthDisabled = disabledMonths(Math.max(month - 1, 1), year)
  const isNextMonthDisabled = disabledMonths(Math.min(month + 1, 12), year)

  return (
    <div className={getDatePickerHeaderVariantClass(variant, className)}>
      <h4 className={cls({ 'text-neutral-1': !variant || variant === 'primary' })}>
        {monthname}, {year}
      </h4>
      <nav className={'flex items-center'}>
        <Icon.ArrowChevronLeft
          className={cls('w-16 h-12 mr-16 cursor-pointer', { 'neutral-icon': !variant || variant === 'primary' })}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => !isPrevMonthDisabled && previousMonth(e)}
        />
        <Icon.ArrowChevronRight
          className={cls('w-16 h-12 cursor-pointer', { 'neutral-icon': !variant || variant === 'primary' })}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => !isNextMonthDisabled && nextMonth(e)}
        />
      </nav>
    </div>
  )
}

export default memo(DatePickerHeader)
