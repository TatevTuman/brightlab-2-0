import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Popover, { PopoverProps } from './Popover'
import { storybook } from '@utils'

export default {
  title: 'Elements/Popover',
  component: Popover,
  argTypes: {
    position: { control: storybook.controls.select(['top', 'left', 'right', 'bottom']), name: 'Position' }
  }
} as Meta

const PopoverStoryTemplate: Story<PopoverProps> = args => {
  return (
    <div style={{ position: 'absolute', left: '400px', top: '200px' }}>
      <Popover {...args} />
    </div>
  )
}

PopoverStoryTemplate.args = {
  position: 'top'
}

export const PopoverStory = PopoverStoryTemplate.bind({})
PopoverStory.args = {
  ...PopoverStoryTemplate.args
}
