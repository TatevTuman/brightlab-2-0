import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from '~ui'

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    variant: {
      name: 'Variant',
      type: { name: 'string', required: false },
      control: { type: 'string' }
    }
  }
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args}>Button</Button>

export const Green = Template.bind({})
Green.args = {
  variant: 'green'
}

export const GreenWhite = Template.bind({})
GreenWhite.args = {
  variant: 'green-white'
}
