import React, { memo } from 'react'
import { Icon } from '@elements'
import { PopoverOptionType } from '@types'
import './Popover.scss'

export interface PopoverProps {
  position?: string | undefined
  options?: PopoverOptionType[]
  open?: boolean
  onClick?(e: MouseEvent): void
}

const Popover: React.FC<PopoverProps> = props => {
  const { options, open, position, onClick } = props
  return (
    <div className={'popover'} data-open={open} position={position}>
      {options && (
        <div className={'popover-list'}>
          {options.length > 1 && <div className={'popover-list-line'} />}
          {options.map((option, index) => {
            const { label } = option
            return (
              <div key={index} className={'popover-list-option'} onClick={() => onClick}>
                <div>{label.name}</div>
                <div>{label.company}</div>
                <div>
                  <div>
                    <Icon name={'clock'} />
                  </div>
                  <div>{label.date}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
Popover.defaultProps = {
  open: true,
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

export default memo(Popover)
