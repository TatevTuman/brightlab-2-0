import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Input, { InputProps } from './Input'
import { storybook } from '@utils'

interface InputStoryTemplateProps extends InputProps {}

export default {
  title: 'Elements/Input',
  argTypes: {
    label: { control: 'text', name: 'Label' },
    placeholder: { control: 'text', name: 'Placeholder' },
    type: { control: storybook.controls.select(['text', 'number']), name: 'Type' },
    prefix: { control: 'text', name: 'Prefix' },
    suffix: { control: 'text', name: 'Suffix' },
    autoComplete: { control: storybook.controls.select(['on', 'off']), name: 'Autocomplete' },
    error: { control: 'boolean', name: 'Error' },
    clearable: { control: 'boolean', name: 'Clearable' },
    ...storybook.controls.interactive,
    onClear: { action: 'onClear' },
    name: storybook.args.disabled
  }
} as Meta

const InputStoryTemplate: Story<InputStoryTemplateProps> = args => {
  return <Input {...args} />
}

InputStoryTemplate.args = {
  ...storybook.actions.interactive,
  type: 'text',
  autoComplete: 'on',
  name: 'Input',
  clearable: true
}

export const InputStory = InputStoryTemplate.bind({})
InputStory.args = {
  ...InputStoryTemplate.args
}
