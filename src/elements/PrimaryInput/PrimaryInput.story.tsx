import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { storybook } from '@utils'
import PrimaryInput, { PrimaryInputProps } from './PrimaryInput'

interface PrimaryInputStoryTemplateProps extends PrimaryInputProps {}

export default {
  title: 'Elements/PrimaryInput',
  argTypes: {
    label: { control: 'text', name: 'Label' },
    placeholder: { control: 'text', name: 'Placeholder' },
    prefix: { control: 'text', name: 'Prefix' },
    suffix: { control: 'text', name: 'Suffix' },
    autoComplete: { control: storybook.controls.select(['on', 'off']), name: 'Autocomplete' },
    clearable: { control: 'boolean', name: 'Clearable' },
    loading: { control: 'boolean', name: 'Loading' },
    ...storybook.controls.interactive,
    onClear: { action: 'onClear' },
    name: storybook.args.disabled
  }
} as Meta

const PrimaryInputStoryTemplate: Story<PrimaryInputStoryTemplateProps> = args => {
  return <PrimaryInput {...args} />
}

PrimaryInputStoryTemplate.args = {
  placeholder: 'Type a text',
  ...storybook.actions.interactive,
  prefix: '',
  suffix: '',
  name: 'primary-input',
  autoComplete: 'on',
  clearable: true,
  loading: false
}

export const PrimaryInputStory = PrimaryInputStoryTemplate.bind({})
PrimaryInputStory.args = {
  ...PrimaryInputStoryTemplate.args
}
