import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { TextInput, TextInputProps } from '~ui'

export default {
  title: 'UI/TextInput',
  component: TextInput,
  argTypes: {
    className: {
      name: 'Class',
      type: { name: 'string', required: false }
    },
    variant: {
      name: 'Variant',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['green'] }
    },
    name: {
      name: 'Name',
      type: { name: 'string', required: false }
    },
    onClick: { action: 'onClick' },
    onChange: { action: 'onChange' }
  },
  args: {
    className: '',
    name: 'test',
    variant: 'green',
    onChange: action('onChange')
  }
} as Meta

const TextInputTemplate: Story<Omit<TextInputProps, 'value'>> = args => {
  const { onChange: onChangeAction, ...otherArgs } = args
  const [value, onChange] = useState('')

  const handleChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value)
    onChangeAction(value, e)
  }

  return <TextInput value={value} onChange={handleChange} {...otherArgs} />
}

export const GreenStory = TextInputTemplate.bind({})
GreenStory.args = {}
