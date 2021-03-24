import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Popover, { PopoverProps } from './Popover'

export default {
  title: 'Elements/Popover',
  component: Popover,
  argTypes: {}
} as Meta

const options = [
  {
    label: {
      name: 'Michael Stevenson',
      company: 'Figma Corporate. Presentation and Sales...',
      date: '8:00 - 9:30'
    },
    value: 'aaa'
  },
  {
    label: {
      name: 'Michael Stevenson',
      company: 'Figma Corporate. Presentation and Sales...',
      date: '8:00 - 9:30'
    },
    value: 'aaa'
  }
]

const Template: Story<PopoverProps> = args => <Popover {...args} options={options} />

export const ExamplePopover = Template.bind({})
