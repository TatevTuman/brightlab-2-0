import React, { memo } from 'react'
import { WEEK_DAYS } from '@utils'
import { Day } from '@types'
import './DatePickerDaysLabels.scss'

// Render the label for day of the week
// This method is used as a map callback as seen here
const DatePickerDaysLabels = () => {
  const daysLabels = Object.keys(WEEK_DAYS)

  return (
    <div className={'date-picker-days-labels'}>
      {daysLabels.map((day: string, index: number) => {
        /* Resolve the day of the week label from the WEEK_DAYS object map */
        const dayLabel = WEEK_DAYS[day as Day].toUpperCase()

        return (
          <div className={'date-picker-day-label'} key={dayLabel} data-index={index}>
            {dayLabel}
          </div>
        )
      })}
    </div>
  )
}

export default memo(DatePickerDaysLabels)
