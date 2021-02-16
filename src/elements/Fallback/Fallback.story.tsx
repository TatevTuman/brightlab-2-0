import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Fallback, { FallbackProps } from './Fallback'

interface FallbackStoryTemplateProps extends FallbackProps {}

export default {
  title: 'Elements/Fallback',
  argTypes: {
    height: { control: 'text', name: 'Height' }
  }
} as Meta

const FallbackStoryTemplate: Story<FallbackStoryTemplateProps> = args => {
  return <Fallback {...args} />
}

FallbackStoryTemplate.args = {
  height: '10rem'
}

export const FallbackStory = FallbackStoryTemplate.bind({})
FallbackStory.args = {
  ...FallbackStoryTemplate.args
}
