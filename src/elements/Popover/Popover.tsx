import React, { memo } from 'react'
import { Icon } from '@elements'
import './Popover.scss'

export interface labelOption {
  name: string
  company: string
  date: string
}
export interface PopoverOptions {
  label: labelOption
  value: string | number
}
export interface PopoverProps {
  options: PopoverOptions[]
  open?: boolean
  onClick?(e: MouseEvent): void
}
const Popover: React.FC<PopoverProps> = props => {
  const { options, onClick, open } = props

  return (
    <div className={'popover'} data-open={open}>
      {options && (
        <div className={'popover-list'}>
          {options.map((option, index) => {
            const { label } = option
            return (
              <div key={index} className={'popover-list-option'} onClick={() => null}>
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
      value: 'aaa'
    },
    {
      label: {
        name: 'Michael Stevenson',
        company: 'Figma Corporate. Presentation and Sales...',
        date: '8:00 - 9:30'
      },
      value: 'aaa'
    }
  ]
}

export default memo(Popover)
