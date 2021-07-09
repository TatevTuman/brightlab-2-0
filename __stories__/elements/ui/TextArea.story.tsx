/* eslint-disable react/jsx-key */

import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { TextArea, TextAreaProps } from '~ui'

export default {
  title: 'UI/TextArea',
  component: TextArea,
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
    rows: {
      name: 'Rows',
      type: { name: 'number', required: false }
    },
    placeholder: {
      name: 'Placeholder',
      type: { name: 'string', required: false }
    },
    name: {
      name: 'Name',
      type: { name: 'string', required: false }
    },
    disabled: {
      name: 'Disabled',
      type: { name: 'boolean', required: false }
    },
    error: {
      name: 'Error message',
      type: { name: 'string', required: false }
    },
    onClick: { action: 'onClick' },
    onChange: { action: 'onChange' }
  },
  args: {
    className: '',
    variant: 'primary',
    rows: '4',
    placeholder: 'Placeholder',
    name: 'test',
    disabled: false,
    onChange: action('onChange')
  }
} as Meta

const TextAreaTemplate: Story<Omit<TextAreaProps, 'value'>> = args => {
  const { onChange: onChangeAction, ...otherArgs } = args
  const [value, onChange] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value
    onChange(value)
    onChangeAction && onChangeAction(e)
  }

  return <TextArea value={value} onChange={handleChange} {...otherArgs} />
}

export const PrimaryStory = TextAreaTemplate.bind({})
PrimaryStory.args = {}

export const LightStory = TextAreaTemplate.bind({})
LightStory.args = {
  variant: 'light'
}
