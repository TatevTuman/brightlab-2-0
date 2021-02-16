import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import Button, { ButtonProps, ButtonSizes, ButtonTypes } from './Button'
import { enumToArray, storybook } from '@utils'

interface ButtonStoryTemplateProps extends ButtonProps {}

export default {
  title: 'Elements/Button',
  argTypes: {
    children: { control: 'text', name: 'Text' },
    type: { control: storybook.controls.select(enumToArray(ButtonTypes)), name: 'Type' },
    size: { control: storybook.controls.select(enumToArray(ButtonSizes)), name: 'Size' },
    to: { control: 'text', name: 'Link' },
    disabled: { control: 'boolean', name: 'Disabled' },
    loading: { control: 'boolean', name: 'Loading' },
    centered: { control: 'boolean', name: 'Centered' },
    onClick: { action: 'onClick' },
    form: storybook.args.disabled,
    submit: storybook.args.disabled,
    className: storybook.args.disabled
  }
} as Meta

const ButtonStoryTemplate: Story<ButtonStoryTemplateProps> = args => {
  return <Button {...args} />
}

ButtonStoryTemplate.args = {
  children: 'Text',
  type: ButtonTypes.primary,
  size: ButtonSizes.lg,
  onClick: action('onClick')
}

export const ButtonStory = ButtonStoryTemplate.bind({})
ButtonStory.args = {
  ...ButtonStoryTemplate.args
}
