import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { DatePicker, DatePickerProps } from '~ui'
import { disabledPastDays, disabledPastMonths } from '~utils'

interface DatePickerStoryTemplateProps extends DatePickerProps {}

export default {
  title: 'UI/DatePicker',
  argTypes: {
    className: { control: 'string', name: 'Class' },
    noToday: { control: 'boolean', name: 'noToday' },
    onDateChange: { action: 'onDateChange' }
  },
  args: {
    className: '',
    noToday: false,
    onDateChange: action('onDateChange')
  }
} as Meta

const DatePickerStoryTemplate: Story<DatePickerStoryTemplateProps> = args => {
  const [dates, setDates] = useState<Date[]>(
    new Array(4).fill(0).map((_, index) => {
      const now = new Date()
      now.setDate(index + 1)
      return now
    })
  )

  const otherProps = {
    dates,
    onDateChange: (dates: Date[], date: Date) => {
      setDates(dates)
      args.onDateChange(dates, date)
    },
    disabledDays: disabledPastDays,
    disabledMonths: disabledPastMonths
  }

  return <DatePicker {...args} {...otherProps} />
}

export const DatePickerStory = DatePickerStoryTemplate.bind({})
DatePickerStory.args = {
  ...DatePickerStoryTemplate.args
}
