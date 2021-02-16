import React, { memo } from 'react'
import { OptionType } from '@types'
import './Dropdown.scss'

export interface DropdownProps {
  options: OptionType[]
  toggle: boolean
  onSelect: (selectedOption: OptionType) => void
}

const Dropdown = (props: DropdownProps) => {
  const { options, onSelect, toggle } = props

  const handleSelect = (e: React.MouseEvent<HTMLLIElement>, option: OptionType) => {
    e.stopPropagation()
    e.preventDefault()
    onSelect(option)
  }

  return (
    <ul className={'dropdown'} data-toggle={toggle} data-selection={true} data-testid={'dropdown'}>
      {options.map((option, index) => {
        const { label } = option
        const key = label + index
        // TODO Enter, Arrows and tab logic + test

        return (
          <li onClick={e => handleSelect(e, option)} key={key}>
            {label}
          </li>
        )
      })}
    </ul>
  )
}

export default memo(Dropdown)
