import React, { memo } from 'react'
import { OptionType } from '@types'
import { Loader, Link } from '@elements'
import styles from './Dropdown.module.scss'

export interface DropdownProps {
  options: OptionType<any>[]
  onSelect: (selectedOption: OptionType<any>) => void
  toggle: boolean
  loading?: boolean
  error?: Error
  noMessage?: string
  allResultsLink?: string
  direction?: 'horizontal' | 'vertical'
}

const Dropdown = (props: DropdownProps) => {
  const {
    options,
    onSelect,
    toggle,
    loading,
    error,
    allResultsLink,
    noMessage = 'No options available',
    direction = 'vertical'
  } = props

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, option: OptionType<any>) => {
    e.stopPropagation()
    e.preventDefault()
    onSelect(option)
  }

  const renderOptions = () => {
    const isOptions = options && options.length

    if (error) {
      return (
        <div className={styles.dropdownError}>
          <p className="danger">{error.message}</p>
          {JSON.stringify(error)}
        </div>
      )
    }

    if (loading) {
      return (
        <div className={styles.dropdownLoading}>
          <Loader />
        </div>
      )
    }

    if (!isOptions) {
      return <i className={styles.dropdownEmpty}>{noMessage}</i>
    }

    /* For Global Search element */
    if (allResultsLink) {
      return options.slice(0, 7).map((option, index) => {
        const { label } = option
        const key = label + index

        if (index === 6) {
          return (
            <div key={key} className={styles.dropdownAllResultsLink}>
              <hr />
              <Link to={allResultsLink} underlined>
                All results
              </Link>
            </div>
          )
        }

        return (
          <li key={key} onClick={e => handleClick(e, option)}>
            {label}
          </li>
        )
      })
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
    <ul
      className={styles.dropdown}
      data-toggle={toggle}
      data-selection={true}
      data-direction={direction}
      data-testid={'dropdown'}
    >
      {renderOptions()}
    </ul>
  )
}

export default memo(Dropdown)
