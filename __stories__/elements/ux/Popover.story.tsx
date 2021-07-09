import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button } from '~ui'
import { Popover, PopoverProps } from '~ux'

export default {
  title: 'UX/Popover',
  component: Popover,
  argTypes: {
    placement: {
      name: 'Placement',
      type: { name: 'string', required: false },
      control: {
        type: 'select',
        options: [
          'top',
          'top-start',
          'top-end',
          'right',
          'right-start',
          'right-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end'
        ]
      }
    }
  },
  args: {
    placement: 'bottom'
  }
} as Meta

const PopoverTemplate: Story<Omit<PopoverProps, 'show' | 'onHide' | 'children' | 'panel'> & { placement: string }> =
  args => {
    const [show, setShow] = useState(false)

    const description1 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    const description2 =
      'Adipisci amet animi architecto cumque deserunt explicabo facere fugit incidunt, nesciunt officiis provident quasi, quo recusandae rem, sed sit vel! Debitis, reprehenderit'

    const panel = (
      <div className={'w-200 bg-neutral-14 rounded-8 px-16 pt-8 pb-20 text-neutral-1'}>
        <h4 className={'mb-16'}>Popover heading</h4>
        <p className={'mb-8'}>{description1}</p>
        <p>{description2}</p>
      </div>
    )

    return (
      <Popover
        show={show}
        onHide={setShow}
        panel={panel}
        options={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          placement: args.placement
        }}
      >
        <Button onClick={() => setShow(!show)}>Open popover</Button>
      </Popover>
    )
  }

export const PrimaryStory = PopoverTemplate.bind({})
PrimaryStory.args = {}
