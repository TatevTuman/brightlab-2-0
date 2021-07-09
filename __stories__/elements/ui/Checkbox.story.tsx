import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Checkbox, CheckboxProps } from '~ui'

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
  argTypes: {
    className: {
      name: 'Class',
      type: { name: 'string', required: false }
    },
    variant: {
      name: 'Variant',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['primary'] }
    },
    name: {
      name: 'Name',
      type: { name: 'string', required: false }
    },
    label: {
      name: 'Label',
      type: { name: 'string', required: false }
    },
    value: {
      name: 'Value',
      type: { name: 'boolean', required: false }
    },
    outlined: {
      name: 'Outlined checkbox',
      type: { name: 'boolean', required: false } 
    },
    onChange: { action: 'onChange' }
  },
  args: {
    className: 'w-15 h-15',
    variant: 'primary',
    name: '',
    label: 'John Doe',
    value: false,
    outlined: false,
    onChange: action('onChange')
  }
} as Meta

const CheckboxTemplate: Story<Omit<CheckboxProps, 'ref'>> = args => {
  return <Checkbox {...args} />
}

export const PrimaryStory = CheckboxTemplate.bind({})
PrimaryStory.args = {
  variant: 'primary'
}
