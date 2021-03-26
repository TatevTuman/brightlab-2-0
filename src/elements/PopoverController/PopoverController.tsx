import React, { memo, useState } from 'react'
import { Popover } from '@elements'
import { PopoverOptionType } from '@types'
import './PopoverController.scss'

export type Position = 'left' | 'top' | 'right' | 'bottom'

export interface PopoverControllerProps {
  options?: PopoverOptionType[]
  position?: Position
}

const PopoverController: React.FC<PopoverControllerProps> = props => {
  const { position, options } = props
  const [open, setOpen] = useState(false)

  return (
    <div className={'controller'}>
      <div className={'controller-button'} onClick={() => setOpen(!open)}>
        +{options?.length}
        <Popover open={open} position={position} options={options} />
      </div>
    </div>
  )
}
PopoverController.defaultProps = {
  position: 'top',
  options: [
    {
      label: {
        name: 'Michael Stevenson',
        company: 'Figma Corporate. Presentation and Sales...',
        date: '8:00 - 9:30'
      },
      value: 'First Option'
    },
    {
      label: {
        name: 'Michael Stevenson',
        company: 'Figma Corporate. Presentation and Sales...',
        date: '8:00 - 9:30'
      },
      value: 'Second Option'
    }
  ]
}

export default memo(PopoverController)
