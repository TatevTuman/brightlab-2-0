import React, { memo } from 'react'
import { isEqual } from 'lodash'
import { OptionType } from '@types'
import './Switcher.scss'

export interface SwitcherProps {
  options: OptionType[]
  value: string
  onClick(value: string): void
}

const Switcher: React.FC<SwitcherProps> = props => {
  const { options, value, onClick } = props

  let side = null

  options.forEach((option, index) => {
    if (isEqual(option.value, value)) {
      side = index === 0 ? (side = 'left') : index == 1 ? (side = 'center') : (side = 'right')
    }
  })

  return (
    <div className={'switcher'}>
      <div className={'switcher-side'} data-side={side} />
      {options.map(option => {
        const { label } = option
        const isActive = isEqual(option.value, value)

        return (
          <div key={label} className={'switcher-section'} onClick={() => onClick(option.value)} data-active={isActive}>
            <span>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
Switcher.defaultProps = {
  value: 'week',
  options: [
    {
      label: 'Month',
      value: 'month'
    },
    {
      label: 'Day',
      value: 'day'
    },
    {
      label: 'Week',
      value: 'week'
    }
  ]
}

export default memo(Switcher)
