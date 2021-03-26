import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Popover, { PopoverProps } from './Popover'
import { action } from '@storybook/addon-actions'
import { storybook } from '@utils'


const options = [
  {
    label: {
      name: 'Michael Stevenson',
      company: 'Figma Corporate. Presentation and Sales...',
      date: '8:00 - 9:30'
    },
    value: 'first Option'
  },
  {
    label: {
      name: 'Michael Stevenson',
      company: 'Figma Corporate. Presentation and Sales...',
      date: '8:00 - 9:30'
    },
    value: 'second Option'
  }
]

export default {
  title: 'Elements/Popover',
  component: Popover,
  argTypes: {
    open: { control: 'boolean', name: 'open' },
    onClick: { action: 'onClick' }
  }
} as Meta

const PopoverStoryTemplate: Story<PopoverProps> = args => <Popover {...args} options={options} />

PopoverStoryTemplate.args = {
  onClick: action('onClick')
}

export const PopoverStory = PopoverStoryTemplate.bind({})
PopoverStory.args = {
  ...PopoverStoryTemplate.args
}
