import React, { memo } from 'react'
import { OptionType } from '@types'
import styles from './Dropdown.module.scss'

export interface DropdownProps {
  options: OptionType<any>[]
  onSelect: (selectedOption: OptionType<any>) => void
}

const Dropdown = (props: DropdownProps) => {
  const { options, onSelect } = props

  return (
    <ul className={styles.dropdown}>
      {options.map((option, index) => {
        const { label } = option
        const key = label + index

        return (
          <li onClick={() => onSelect(option)} key={key}>
            {label}
          </li>
        )
      })}
    </ul>
  )
}

export default memo(Dropdown)
