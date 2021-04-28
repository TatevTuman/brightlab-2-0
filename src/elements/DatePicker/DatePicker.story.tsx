import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import DatePicker, { DatePickerProps } from './DatePicker'
import { disabledPastDays, disabledPastMonths } from '@utils'

interface DatePickerStoryTemplateProps extends DatePickerProps {}

export default {
  title: 'Elements/DatePicker',
  argTypes: {
    noToday: { control: 'boolean', name: 'noToday' },
    onDateChange: { action: 'onDateChange' }
  }
} as Meta

const DatePickerStoryTemplate: Story<DatePickerStoryTemplateProps> = args => {
  const [dates, setDates] = useState<(Date | null)[]>(
    new Array(4).fill(0).map((_, index) => {
      const now = new Date()
      now.setDate(index + 1)
      return now
    })
  )

  const otherProps = {
    dates,
    onDateChange: setDates,
    disabledDays: disabledPastDays,
    disabledMonths: disabledPastMonths
  }

  return <DatePicker {...args} {...otherProps} />
}

DatePickerStoryTemplate.args = {
  noToday: false,
  onDateChange: action('onDateChange')
}

export const DatePickerStory = DatePickerStoryTemplate.bind({})
DatePickerStory.args = {
  ...DatePickerStoryTemplate.args
}
