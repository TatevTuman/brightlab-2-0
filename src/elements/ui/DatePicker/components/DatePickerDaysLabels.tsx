import React, { memo } from 'react'
import cls from 'classnames'
import { WEEK_SHORT_DAYS } from '~utils'
import { ClassName, Day } from '~types'
import { DatePickerVariantType } from '../DatePicker'

const datePickerDaysLabelsBaseVariant = 'text-center text-12'
const datePickerDaysLabelsPrimaryVariant = 'text-neutral-3'

const getDatePickerDaysLabelsVariantClass = (variant: DatePickerVariantType, className?: ClassName) => {
  return cls(className, datePickerDaysLabelsBaseVariant, {
    [`${datePickerDaysLabelsPrimaryVariant}`]: !variant || variant === 'primary'
  })
}

export interface DatePickerDaysLabelsProps {
  className?: ClassName
  variant?: DatePickerVariantType
}

// Render the label for day of the week
// This method is used as a map callback as seen here
const DatePickerDaysLabels: React.FC<DatePickerDaysLabelsProps> = props => {
  const { className, variant = 'primary' } = props
  const daysLabels = Object.keys(WEEK_SHORT_DAYS)

  return (
    <div className={'grid grid-cols-7 gap-3 px-20 py-18'}>
      {daysLabels.map((day: string, index: number) => {
        /* Resolve the day of the week label from the WEEK_DAYS object map */
        const dayLabel = WEEK_SHORT_DAYS[day as Day]

        return (
          <div className={getDatePickerDaysLabelsVariantClass(variant, className)} key={dayLabel} data-index={index}>
            {dayLabel}
          </div>
        )
      })}
    </div>
  )
}

export default memo(DatePickerDaysLabels)
