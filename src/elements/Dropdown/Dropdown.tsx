import React, { memo } from 'react'
import { OptionType } from '@types'
import styles from './Dropdown.module.scss'

export interface DropdownProps<T> {
  id: string
  options: OptionType<T>[]
  onSelect: (option: OptionType<T>) => void
}

const Dropdown = <T,>(props: DropdownProps<T>) => {
  const { id, options, onSelect } = props

  const MemoizedDropdown = memo(() => {
    return (
      <ul id={id} className={styles.dropdown} tabIndex={0}>
        {options.map((option, index) => {
          const { label } = option
          const key = label + index

          return (
            <li onClick={() => onSelect(option)} key={key} tabIndex={0}>
              {label}
            </li>
          )
        })}
      </ul>
    )
  })

  MemoizedDropdown.displayName = 'Dropdown'

  return <MemoizedDropdown />
}

export default Dropdown
