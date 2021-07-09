/* eslint-disable react/jsx-key */

import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { DateTimeSelect, DateTimeSelectProps } from '~ui'

export default {
  title: 'UI/DateTimeSelect',
  component: DateTimeSelect,
  argTypes: {
    className: {
      name: 'Class',
      type: { name: 'string', required: false }
    },
    startHour: {
      name: 'Start hour',
      type: { name: 'number', required: false }
    },
    endHour: {
      name: 'End hour',
      type: { name: 'number', required: false }
    },
    step: {
      name: 'Step',
      type: { name: 'number', required: false }
    },
    onChange: { action: 'onChange' }
  },
  args: {
    className: '',
    startHour: 8,
    endHour: 23,
    step: 30,
    onChange: action('onChange')
  }
} as Meta

const DateTimeSelectTemplate: Story<Omit<DateTimeSelectProps, 'value' | 'date'>> = args => {
  const { onChange: onChangeAction, ...otherArgs } = args
  const [value, onChange] = useState(new Date().toISOString())

  const handleChange = (value: string) => {
    onChange(value)
    onChangeAction && onChangeAction(value)
  }

  return <DateTimeSelect value={value} onChange={handleChange} {...otherArgs} />
}

export const PrimaryStory = DateTimeSelectTemplate.bind({})
PrimaryStory.args = {}
