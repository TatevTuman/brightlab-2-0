import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Loader, { LoaderProps } from './Loader'
import { storybook, colors } from '@utils'

interface LoaderStoryTemplateProps extends LoaderProps {}

const loaderTypes = [
  'Audio',
  'BallTriangle',
  'Bars',
  'Circles',
  'Grid',
  'Hearts',
  'MutatingDots',
  'None',
  'NotSpecified',
  'Oval',
  'Plane',
  'Puff',
  'RevolvingDot',
  'Rings',
  'TailSpin',
  'ThreeDots',
  'Triangle',
  'Watch'
]

export default {
  title: 'Elements/Loader',
  argTypes: {
    type: { control: storybook.controls.select(loaderTypes), name: 'Type' },
    width: { control: 'number', name: 'Width' },
    height: { control: 'number', name: 'Height' },
    radius: { control: 'number', name: 'Radius' },
    color: { control: storybook.controls.color, name: 'Color' },
    secondaryColor: { control: storybook.controls.color, name: 'SecondaryColor' },
    timeout: { control: 'number', name: 'Timeout' },
    style: { control: 'object', name: 'Style' },
    className: storybook.args.disabled
  }
} as Meta

const LoaderStoryTemplate: Story<LoaderStoryTemplateProps> = args => {
  return <Loader {...args} />
}

LoaderStoryTemplate.args = {
  type: loaderTypes[9] as 'Oval',
  width: 200,
  height: 200,
  radius: 0,
  color: colors[0],
  secondaryColor: colors[1],
  timeout: 100000,
  style: {}
}

export const LoaderStory = LoaderStoryTemplate.bind({})
LoaderStory.args = {
  ...LoaderStoryTemplate.args
}
