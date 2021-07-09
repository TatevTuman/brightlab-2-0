import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '~ui'
import { Dialog, DialogProps } from '~ux'
import * as Icon from '~svg'

export default {
  title: 'UX/Dialog',
  component: Dialog,
  argTypes: {
    className: {
      name: 'Class',
      type: { name: 'string', required: false }
    },
    position: {
      name: 'Position',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['default', 'center'] }
    },
    onHide: { action: 'onChange' }
  },
  args: {}
} as Meta

const DialogTemplate: Story<Omit<DialogProps, 'show' | 'onHide' | 'children'> & { placement: string }> = args => {
  const { position = 'default' } = args
  const [show, setShow] = useState(false)

  const description1 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  const description2 =
    'Adipisci amet animi architecto cumque deserunt explicabo facere fugit incidunt, nesciunt officiis provident quasi, quo recusandae rem, sed sit vel! Debitis, reprehenderit'

  return (
    <>
      <Button onClick={() => setShow(true)}>Open Dialog</Button>
      <Dialog show={show} onHide={() => setShow(false)} position={position}>
        <div className={'text-neutral-10'}>
          <div className={'px-32 py-24 flex justify-between items-center border-b border-neutral-1.5'}>
            <h4>Dialog Heading</h4>
            <Icon.Times className={'w-12 h-12 text-neutral-4 cursor-pointer'} onClick={() => setShow(false)} />
          </div>
          <div className={'p-16'}>
            <p className={'mb-8'}>{description1}</p>
            <p>{description2}</p>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export const PositionCenterStory = DialogTemplate.bind({})
PositionCenterStory.args = {
  position: 'center'
}
