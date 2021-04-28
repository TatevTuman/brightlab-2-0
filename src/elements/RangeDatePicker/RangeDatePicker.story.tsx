import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { addMonths } from '@utils'
import RangeDatePicker, { RangeDatePickerProps } from './RangeDatePicker'

interface RangeDatePickerStoryTemplateProps extends RangeDatePickerProps {}

export default {
  title: 'Elements/RangeDatePicker',
  argTypes: {
    noToday: { control: 'boolean', name: 'noToday' },
    onDatesChange: { action: 'onDatesChange' }
  }
} as Meta

const RangeDatePickerStoryTemplate: Story<RangeDatePickerStoryTemplateProps> = args => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(addMonths(new Date(), 2))

  const otherProps = {
    startDate,
    endDate
  }

  return (
    <RangeDatePicker
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

RangeDatePickerStoryTemplate.args = {
  noToday: false,
  onDatesChange: action('onDatesChange')
}

export const RangeDatePickerStory = RangeDatePickerStoryTemplate.bind({})
RangeDatePickerStory.args = {
  ...RangeDatePickerStoryTemplate.args
}
