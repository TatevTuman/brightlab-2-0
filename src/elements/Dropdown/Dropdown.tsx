import React, { memo } from 'react'
import { OptionType } from '@types'
import { Loader } from '@elements'
import styles from './Dropdown.module.scss'

export interface DropdownProps {
  options: OptionType<any>[]
  onSelect: (selectedOption: OptionType<any>) => void
  opened: boolean
  loading?: boolean
  error?: Error
  noMessage?: string
}

const Dropdown = (props: DropdownProps) => {
  const { options, onSelect, opened, loading, error, noMessage = 'No options available' } = props

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, option: OptionType<any>) => {
    e.stopPropagation()
    e.preventDefault()
    onSelect(option)
  }

  const renderOptions = () => {
    const isOptions = options && options.length

    if (error) {
      return (
        <div className="">
          <p className="danger">{error.message}</p>
          {JSON.stringify(error)}
        </div>
      )
    }

    if (loading) {
      return <Loader type={'Plane'} />
    }

    if (!isOptions) {
      return <em className={styles.dropdownEmpty}>{noMessage}</em>
    }

    return options.map((option, index) => {
      const { label } = option
      const key = label + index
      // TODO Enter, Arrows and tab logic + test

      return (
        <li onClick={e => handleClick(e, option)} key={key}>
          {label}
        </li>
      )
    })
  }

  return (
    <ul className={styles.dropdown} data-opened={opened} data-selection={true} data-testid={'dropdown'}>
      {loading ? <Loader /> : renderOptions()}
    </ul>
  )
}

export default memo(Dropdown)
