import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import Checkbox, { CheckboxProps } from './Checkbox'
import { storybook } from '@utils'

interface CheckboxStoryTemplateProps extends CheckboxProps {}

export default {
  title: 'Elements/Checkbox',
  argTypes: {
    label: { control: 'text', name: 'Label' },
    checked: { control: 'boolean', name: 'Checked' },
    disabled: { control: 'boolean', name: 'Disabled' },
    required: { control: 'boolean', name: 'Required' },
    focusable: { control: 'boolean', name: 'Focusable' },
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
    onBlur: { action: 'onBlur' },
    onKeyDown: { action: 'onKeyDown' },
    defaultChecked: storybook.args.disabled,
    id: storybook.args.disabled
  }
} as Meta

const CheckboxStoryTemplate: Story<CheckboxStoryTemplateProps> = args => {
  return <Checkbox {...args} />
}

CheckboxStoryTemplate.args = {
  id: 'Checkbox',
  label: 'Text',
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
  onKeyDown: action('onKeyDown')
}

export const CheckboxStory = CheckboxStoryTemplate.bind({})
CheckboxStory.args = {
  ...CheckboxStoryTemplate.args
}
