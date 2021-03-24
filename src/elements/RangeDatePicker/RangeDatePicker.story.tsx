import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { DAY } from '@utils'
import RangeDatePicker, { RangeDatePickerProps } from './RangeDatePicker'

interface RangeDatePickerStoryTemplateProps extends RangeDatePickerProps {}

export default {
  title: 'Elements/RangeDatePicker',
  argTypes: {
    noToday: { control: 'boolean', name: 'noToday' },
    onDatesChange: { action: 'onDatesChange' },
    onMonthsChange: { action: 'onMonthsChange' },
    onYearsChange: { action: 'onYearsChange' }
  }
} as Meta

const RangeDatePickerStoryTemplate: Story<RangeDatePickerStoryTemplateProps> = args => {
  const otherProps = {
    disabledDays: (day: Date) => {
      const today = new Date()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return day - today < -DAY
    },
    disabledMonths: (month: number, year: number) => {
      const currentMonth = new Date().getMonth() + 1
      const currentYear = new Date().getFullYear()

      return month < currentMonth && currentYear === year
    }
  }

  return <RangeDatePicker {...args} {...otherProps} />
}

RangeDatePickerStoryTemplate.args = {
  noToday: false,
  onDatesChange: action('onDatesChange'),
  onMonthsChange: action('onMonthsChange'),
  onYearsChange: action('onYearsChange')
}

export const RangeDatePickerStory = RangeDatePickerStoryTemplate.bind({})
RangeDatePickerStory.args = {
  ...RangeDatePickerStoryTemplate.args
}
