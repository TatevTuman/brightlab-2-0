import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Checkbox, { CheckboxProps } from './Checkbox'
import { storybook } from '@utils'

interface CheckboxStoryTemplateProps extends CheckboxProps {}

export default {
  title: 'Elements/Checkbox',
  argTypes: {
    label: { control: 'text', name: 'Label' },
    checked: { control: 'boolean', name: 'Checked' },
    ...storybook.controls.interactive,
    name: storybook.args.disabled
  }
} as Meta

const CheckboxStoryTemplate: Story<CheckboxStoryTemplateProps> = args => {
  return <Checkbox {...args} />
}

CheckboxStoryTemplate.args = {
  name: 'Checkbox',
  label: 'Text',
  ...storybook.actions.interactive
}

export const CheckboxStory = CheckboxStoryTemplate.bind({})
CheckboxStory.args = {
  ...CheckboxStoryTemplate.args
}
