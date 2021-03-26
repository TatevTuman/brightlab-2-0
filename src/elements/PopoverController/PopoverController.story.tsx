import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import PopoverController, { PopoverControllerProps } from './PopoverController'
import { storybook } from '@utils'

export default {
  title: 'Elements/PopoverСontroller',
  component: PopoverController,
  argTypes: {
    position: {
      control: storybook.controls.select(['top', 'left', 'right', 'bottom']),
      name: 'Position'
    }
  }
} as Meta

const PopoverControllerStoryTemplate: Story<PopoverControllerProps> = args => {
  return (
    <div style={{ paddingTop: '150px', paddingLeft: '200px' }}>
      <PopoverController {...args} />
    </div>
  )
}

PopoverControllerStoryTemplate.args = {
  position: 'top'
}

export const PopoverControllerStory = PopoverControllerStoryTemplate.bind({})
PopoverControllerStory.args = {
  ...PopoverControllerStoryTemplate.args
}
