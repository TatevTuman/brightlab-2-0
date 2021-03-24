import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Switcher, { SwitcherProps } from './Switcher'
import { storybook } from '@utils'
import { action } from '@storybook/addon-actions'

interface SwitcherStoryTemplateProps extends SwitcherProps {}

const options = [
  {
    label: 'Month',
    value: 'month'
  },
  {
    label: 'Day',
    value: 'day'
  },
  {
    label: 'Week',
    value: 'week'
  }
]

export default {
  title: 'Elements/Switcher',
  component: Switcher,
  argTypes: {
    value: { control: storybook.controls.select(options.map(option => option.value)), name: 'Value' },
    onCLick: { action: 'onClick' }
  }
} as Meta

const SwitcherStoryTemplate: Story<SwitcherStoryTemplateProps> = args => {
  return <Switcher {...args} options={options} />
}

SwitcherStoryTemplate.args = {
  value: options[0].value,
  onClick: action('onClick')
}

export const SwitcherStory = SwitcherStoryTemplate.bind({})
SwitcherStory.args = {
  ...SwitcherStoryTemplate.args
}
