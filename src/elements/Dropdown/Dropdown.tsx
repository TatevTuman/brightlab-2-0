import React, { memo } from 'react'
import { OptionType } from '@types'
import styles from './Dropdown.module.scss'

export interface DropdownProps {
  options: OptionType<any>[]
  onSelect: (selectedOption: OptionType<any>) => void
  opened: boolean
}

const Dropdown = (props: DropdownProps) => {
  const { options, onSelect, opened } = props

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, option: OptionType<any>) => {
    e.stopPropagation()
    e.preventDefault()
    onSelect(option)
  }

  return (
    <ul className={styles.dropdown} data-opened={opened} data-selection={true}>
      {options.map((option, index) => {
        const { label } = option
        const key = label + index

        return (
          <li onClick={e => handleClick(e, option)} key={key}>
            {label}
          </li>
        )
      })}
    </ul>
  )
}

export default memo(Dropdown)
