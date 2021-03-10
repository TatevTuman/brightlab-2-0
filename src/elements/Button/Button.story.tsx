import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { storybook } from '@utils'
import Button, { ButtonProps } from './Button'

interface ButtonStoryTemplateProps extends ButtonProps {}

export default {
  title: 'Elements/Button',
  argTypes: {
    children: { control: 'text', name: 'Text' },
    type: { control: storybook.controls.select(['primary']), name: 'Type' },
    to: { control: 'text', name: 'Link' },
    disabled: { control: 'boolean', name: 'Disabled' },
    loading: { control: 'boolean', name: 'Loading' },
    centered: { control: 'boolean', name: 'Centered' },
    onClick: { action: 'onClick' }
  }
} as Meta

const ButtonStoryTemplate: Story<ButtonStoryTemplateProps> = args => {
  return <Button {...args} />
}

ButtonStoryTemplate.args = {
  children: 'Text',
  type: 'primary',
  onClick: action('onClick')
}

export const ButtonStory = ButtonStoryTemplate.bind({})
ButtonStory.args = {
  ...ButtonStoryTemplate.args
}
