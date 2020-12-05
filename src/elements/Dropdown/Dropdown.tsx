import React, { memo } from 'react'
import { OptionType } from '@types'
import { Loader } from '@elements'
import styles from './Dropdown.module.scss'

export interface DropdownProps {
  options: OptionType<any>[]
  onSelect: (selectedOption: OptionType<any>) => void
  opened: boolean
  loading?: boolean
}

const Dropdown = (props: DropdownProps) => {
  const { options, onSelect, opened, loading } = props

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, option: OptionType<any>) => {
    e.stopPropagation()
    e.preventDefault()
    onSelect(option)
  }

  const renderOptions = () =>
    options.map((option, index) => {
      const { label } = option
      const key = label + index

      return (
        <li onClick={e => handleClick(e, option)} key={key}>
          {label}
        </li>
      )
    })

  const renderLoading = () => <Loader visible={loading} />

  return (
    <ul className={styles.dropdown} data-opened={opened} data-selection={true} data-testid={'dropdown'}>
      {loading ? renderLoading() : renderOptions()}
    </ul>
  )
}

export default memo(Dropdown)
