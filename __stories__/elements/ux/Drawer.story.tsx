import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '~ui'
import { Drawer, DrawerProps } from '~ux'

export default {
  title: 'UX/Drawer',
  component: Drawer,
  argTypes: {
    className: {
      name: 'Class',
      type: { name: 'string', required: false }
    },
    variant: {
      name: 'Variant',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['primary'] }
    },
    position: {
      name: 'Position',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['left', 'right'] }
    },
    title: {
      name: 'Title',
      type: { name: 'string', required: false }
    }
  },
  args: {
    className: '',
    variant: 'primary',
    position: 'right',
    title: 'Drawer title'
  }
} as Meta

const DrawerTemplate: Story<Omit<DrawerProps, 'show' | 'onHide' | 'children' | 'buttons'>> = args => {
  const [show, setShow] = useState(false)

  const buttons = (
    <>
      <Button className={'mr-16'}>Cancel</Button>
      <Button variant={'primary'}>Submit</Button>
    </>
  )

  const description1 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  const description2 =
    'Adipisci amet animi architecto cumque deserunt explicabo facere fugit incidunt, nesciunt officiis provident quasi, quo recusandae rem, sed sit vel! Debitis, reprehenderit'

  return (
    <>
      <Button className={'absolute-center'} onClick={() => setShow(true)}>
        Open
      </Button>
      <Drawer show={show} onHide={setShow} buttons={buttons} {...args}>
        <div className={'text-neutral-1'}>
          <h4 className={'mb-16'}>Listen my story</h4>
          <p className={'mb-8'}>{description1}</p>
          <p>{description2}</p>
        </div>
      </Drawer>
    </>
  )
}

export const PrimaryStory = DrawerTemplate.bind({})
PrimaryStory.args = {}
