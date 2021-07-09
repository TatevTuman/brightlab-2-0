import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Radio, RadioProps } from '~ui'

export default {
  title: 'UI/Radio',
  component: Radio,
  argTypes: {
    className: {
      name: 'Class',
      type: { name: 'string', required: false }
    },
    variant: {
      name: 'Variant',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['primary', 'boxed'] }
    },
    color: {
      name: 'Color',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['normal', 'violet'] }
    },
    direction: {
      name: 'Direction',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['left', 'right'] }
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
    onChange: { action: 'onChange' }
  },
  args: {
    className: 'w-15 h-15 mx-5',
    variant: 'primary',
    direction: 'left',
    color: 'normal',
    name: '',
    label: 'John Doe',
    value: false,
    onChange: action('onChange')
  }
} as Meta

const RadioTemplate: Story<Omit<RadioProps, 'ref'>> = args => {
  return <Radio {...args} />
}

export const PrimaryStory = RadioTemplate.bind({})
PrimaryStory.args = {
  variant: 'primary'
}


export const PrimaryRightStory = RadioTemplate.bind({})
PrimaryRightStory.args = {
  variant: 'primary',
  direction: 'right'
}

export const OutlinedVioletStory = RadioTemplate.bind({})
OutlinedVioletStory.args = {
  outlined: true,
  color: 'violet'
}
