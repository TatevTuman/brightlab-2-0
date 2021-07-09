import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Autocomplete, AutocompleteProps } from '~ui'

export default {
  title: 'UI/Autocomplete',
  component: Autocomplete,
  argTypes: {
    className: {
      name: 'Class',
      type: { name: 'string', required: false }
    },
    name: {
      name: 'Name',
      type: { name: 'string', required: false }
    },
    onChange: { action: 'onChange' }
  },
  args: {
    className: '',
    name: 'test',
    onChange: action('onChange')
  }
} as Meta

const AutocompleteTemplate: Story<Omit<AutocompleteProps, 'value' | 'options'>> = args => {
  const { onChange: onChangeAction, ...otherArgs } = args
  const [value, onChange] = useState('')

  const handleChange = (value: string) => {
    onChange(value)
    onChangeAction(value)
  }

  const options = new Array(20).fill(0).map((_, index) => ({ label: 'Test' + index, value: index.toString() }))

  return <Autocomplete value={value} options={options} onChange={handleChange} {...otherArgs} />
}

export const AutocompleteStory = AutocompleteTemplate.bind({})
AutocompleteStory.args = {}
