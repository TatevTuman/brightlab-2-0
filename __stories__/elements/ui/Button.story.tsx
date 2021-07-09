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
      control: { type: 'select', options: ['primary', 'neutral', 'violet', 'red', 'inline'] }
    },
    loading: {
      name: 'Loading',
      type: { name: 'boolean', required: false }
    },
    disabled: {
      name: 'Disabled',
      type: { name: 'boolean', required: false }
    },
    onClick: { action: 'onClick' }
  },
  args: {
    className: '',
    children: 'Button',
    variant: 'primary',
    onClick: action('onClick')
  }
} as Meta

const ButtonTemplate: Story<Omit<ButtonProps, 'ref'>> = args => {
  return (
    <div className={'grid grid-cols-3'}>
      <Button size={'lg'} {...args} />
      <Button size={'md'} {...args} />
      <Button size={'sm'} {...args} />
    </div>
  )
}

export const PrimaryStory = ButtonTemplate.bind({})
PrimaryStory.args = {
  variant: 'primary'
}

export const NeutralStory = ButtonTemplate.bind({})
NeutralStory.args = {
  variant: 'neutral'
}

export const VioletStory = ButtonTemplate.bind({})
VioletStory.args = {
  variant: 'violet'
}

export const RedStory = ButtonTemplate.bind({})
RedStory.args = {
  variant: 'red'
}

export const InlineStory = ButtonTemplate.bind({})
InlineStory.args = {
  variant: 'inline'
}
