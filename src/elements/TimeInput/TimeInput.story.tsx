import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import TimeInput, { TimeInputProps } from './TimeInput'
import { action } from '@storybook/addon-actions'
import { storybook } from '@utils'

export default {
  title: 'Elements/TimeInput',
  component: TimeInput,
  argTypes: {
    label: { control: 'text', name: 'Label' },
    ...storybook.controls.interactive
  }
} as Meta

const TimeInputStoryTemplate: Story<TimeInputProps> = args => {
  return <TimeInput {...args} />
}

TimeInputStoryTemplate.args = {
  ...storybook.actions.interactive
}

export const TimeInputStory = TimeInputStoryTemplate.bind({})
TimeInputStory.args = {
  ...TimeInputStoryTemplate.args
}
