import React, { memo } from 'react'
import { OptionType } from '@types'
import { Loader } from '@elements'
import './Dropdown.scss'

export interface DropdownProps {
  options: OptionType[]
  onSelect: (selectedOption: OptionType) => void
  toggle: boolean
  loading?: boolean
  error?: Error
  noMessage?: string
  direction?: 'horizontal' | 'vertical'
}

const Dropdown = (props: DropdownProps) => {
  const {
    options,
    onSelect,
    toggle,
    loading,
    error,
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
        <div className={'dropdown__error'}>
          <p className="danger">{error.message}</p>
          {JSON.stringify(error)}
        </div>
      )
    }

    if (loading) {
      return (
        <div className={'dropdown__loading'}>
          <Loader />
        </div>
      )
    }

    if (!isOptions) {
      return <i className={'dropdown__empty'}>{noMessage}</i>
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
      className={'dropdown'}
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
