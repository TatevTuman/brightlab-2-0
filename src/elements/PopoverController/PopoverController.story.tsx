import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import PopoverController, { PopoverControllerProps } from './PopoverController'

export default {
  title: 'Elements/PopoverСontroller',
  component: PopoverController,
  argTypes: {}
} as Meta

const Template: Story<PopoverControllerProps> = args => <PopoverController {...args} />

export const ExamplePopoverController = Template.bind({})
