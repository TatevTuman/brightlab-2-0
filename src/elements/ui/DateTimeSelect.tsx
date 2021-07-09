import React, { memo, forwardRef, useEffect } from 'react'
import { Select, SelectProps } from '~ui'
import { addMinutes, arrayToOptions, getDateHoursMinutesAMPMFormat, getDateTimeline } from '~utils'

export interface DateTimeSelectProps extends Omit<SelectProps, 'options'> {
  startHour?: number
  endHour?: number
  step?: number
  timezone?: string
}

const DateTimeSelect = forwardRef<HTMLInputElement, DateTimeSelectProps>((props, ref) => {
  const { value, startHour = 8, endHour = 23, step = 30, timezone, onChange, ...rest } = props

  const dateTimeline = getDateTimeline(new Date(value), startHour, endHour, step, timezone)
  const options = arrayToOptions(dateTimeline, getDateHoursMinutesAMPMFormat, date => date.toISOString())

  useEffect(() => {
    const date = new Date(value)

    const dateTimeMinutes = date.getMinutes()
    const dateTimeMinutesStepRest = dateTimeMinutes % step
    const dateTimeMinutesStepCeil = step - dateTimeMinutesStepRest

    const nextDate = addMinutes(date, dateTimeMinutesStepCeil)

    nextDate.setSeconds(0)
    nextDate.setMilliseconds(0)

    onChange(nextDate.toISOString())
  }, [])

  return <Select value={value} options={options} onChange={onChange} ref={ref} {...rest} />
})

DateTimeSelect.displayName = 'DateTimeSelect'

export default memo(DateTimeSelect)
