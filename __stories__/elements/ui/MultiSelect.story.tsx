import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { MultiSelect, MultiSelectProps } from '~ui'
import { arrayToOptions } from '~utils'

export default {
  title: 'UI/MultiSelect',
  component: MultiSelect,
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

const users = new Array(20)
  .fill(0)
  .map((_, index) => ({ id: Math.random().toString(), name: 'John Doe' + index, avatar: '' }))

const MultiSelectTemplate: Story<Omit<MultiSelectProps, 'value' | 'options' | 'onOptionRender'>> = args => {
  const { onChange: onChangeAction, ...otherArgs } = args
  const [value, onChange] = useState<string[]>([])

  const handleChange = (value: string[]) => {
    onChange(value)
    onChangeAction(value)
  }

  const options = arrayToOptions(users, 'name', 'id')

  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={handleChange}
      onOptionRender={({ onOptionRemove }, option) => {
        const user = users.find(user => user.id === option.value)

        return (
          <div key={option.value} className={'mr-4 mb-4'}>
            {user!.name}
          </div>
        )
      }}
      {...otherArgs}
    />
  )
}

export const MultiSelectStory = MultiSelectTemplate.bind({})
MultiSelectStory.args = {}
