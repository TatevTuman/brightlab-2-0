import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Icon, { IconProps } from './Icon'
import { storybook } from '@utils'

interface IconStoryTemplateProps extends IconProps {}

export default {
  title: 'Elements/Icon',
  argTypes: {
    name: {
      control: storybook.controls.icon,
      name: 'Name'
    }
  }
} as Meta

const IconStoryTemplate: Story<IconStoryTemplateProps> = args => {
  return <Icon {...args} />
}

IconStoryTemplate.args = {
  name: 'actions'
}

export const IconStory = IconStoryTemplate.bind({})
IconStory.args = {
  ...IconStoryTemplate.args
}
