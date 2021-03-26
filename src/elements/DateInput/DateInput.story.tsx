import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import DateInput, { DateInputProps } from './DateInput'
import { storybook } from '@utils'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Elements/DateInput',
  component: DateInput,
  argTypes: {
    onChange: { action: 'onChange' }
  }
} as Meta

const DateInputStoryTemplate: Story<DateInputProps> = args => {
  return (
    <div style={{ paddingTop: '250px', paddingBottom: '20px' }}>
      <DateInput {...args} />
    </div>
  )
}

DateInputStoryTemplate.args = {
  onChange: action('onChange')
}

export const DateInputStory = DateInputStoryTemplate.bind({})
DateInputStory.args = {
  ...DateInputStoryTemplate.args
}
