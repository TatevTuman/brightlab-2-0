import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { DAY } from '@utils'
import DatePicker, { DatePickerProps } from './DatePicker'

interface DatePickerStoryTemplateProps extends DatePickerProps {}

export default {
  title: 'Elements/DatePicker',
  argTypes: {
    noToday: { control: 'boolean', name: 'noToday' },
    onDateChange: { action: 'onDateChange' },
    onMonthChange: { action: 'onMonthChange' },
    onYearChange: { action: 'onYearChange' }
  }
} as Meta

const DatePickerStoryTemplate: Story<DatePickerStoryTemplateProps> = args => {
  const otherProps = {
    disabledDays: (day: Date) => {
      const today = new Date()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return day - today < -DAY
    },
    disabledMonths: (month: number) => {
      const currentMonth = new Date().getMonth() + 1
      return month < currentMonth
    }
  }

  return <DatePicker {...args} {...otherProps} />
}

DatePickerStoryTemplate.args = {
  noToday: false,
  onDateChange: action('onDateChange'),
  onMonthChange: action('onMonthChange'),
  onYearChange: action('onYearChange')
}

export const DatePickerStory = DatePickerStoryTemplate.bind({})
DatePickerStory.args = {
  ...DatePickerStoryTemplate.args
}
