import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { addMonths } from '~utils'
import { DateRangePicker, DateRangePickerProps } from '~ui'

interface DateRangePickerStoryTemplateProps extends DateRangePickerProps {}

export default {
  title: 'UI/DateRangePicker',
  argTypes: {
    noToday: { control: 'boolean', name: 'noToday' },
    onDatesChange: { action: 'onDatesChange' }
  }
} as Meta

const DateRangePickerStoryTemplate: Story<DateRangePickerStoryTemplateProps> = args => {
  const [startDate, setStartDate] = useState<Date | null>(addMonths(new Date(), 2))
  const [endDate, setEndDate] = useState<Date | null>(addMonths(new Date(), 3))

  const otherProps = {
    startDate,
    endDate
  }

  return (
    <DateRangePicker
      {...args}
      {...otherProps}
      onDatesChange={(startDate, endDate) => {
        args.onDatesChange(startDate, endDate)
        setStartDate(startDate)
        setEndDate(endDate)
      }}
    />
  )
}

DateRangePickerStoryTemplate.args = {
  noToday: false,
  onDatesChange: action('onDatesChange')
}

export const DateRangePickerStory = DateRangePickerStoryTemplate.bind({})
DateRangePickerStory.args = {
  ...DateRangePickerStoryTemplate.args
}
