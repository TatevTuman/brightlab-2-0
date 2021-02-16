import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import Dropdown, { DropdownProps } from './Dropdown'

interface DropdownStoryTemplateProps extends Omit<DropdownProps, 'options'> {
  optionText: string
}

export default {
  title: 'Elements/Dropdown',
  argTypes: {
    toggle: { control: 'boolean', name: 'Toggle' },
    optionText: { control: 'text', name: 'Option Text' },
    onSelect: { action: 'onSelect' }
  }
} as Meta

const DropdownStoryTemplate: Story<DropdownStoryTemplateProps> = args => {
  const options = new Array(100).fill({ label: args.optionText, value: args.optionText })
  return <Dropdown {...args} options={options} />
}

DropdownStoryTemplate.args = {
  optionText: 'Option',
  toggle: true,
  onSelect: action('onSelect')
}

export const DropdownStory = DropdownStoryTemplate.bind({})
DropdownStory.args = {
  ...DropdownStoryTemplate.args
}
