import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button, ButtonProps } from '~ui'

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    className: {
      name: 'Class',
      type: { name: 'string', required: false }
    },
    children: {
      name: 'Children',
      type: { name: 'string', required: false }
    },
    variant: {
      name: 'Variant',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['green', 'green-white'] }
    },
    onClick: { action: 'onClick' }
  },
  args: {
    className: '',
    children: 'Button',
    variant: 'green',
    onClick: action('onClick')
  }
} as Meta

const ButtonTemplate: Story<ButtonProps> = args => <Button {...args} />

export const GreenStory = ButtonTemplate.bind({})
GreenStory.args = {
  variant: 'green'
}

export const GreenWhiteStory = ButtonTemplate.bind({})
GreenWhiteStory.args = {
  variant: 'green-white'
}
