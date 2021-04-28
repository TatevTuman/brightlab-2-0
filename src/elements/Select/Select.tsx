import React, { RefObject } from 'react'
import {
  withOptionSelect,
  WithOptionSelectProps,
  WithOptionSelectPropsPassed,
  withToggle,
  WithToggleProps,
  WithTogglePropsPassed
} from '@hocs'

import { Dropdown, Input, InputProps, DropdownProps, Icon } from '@elements'
import { OptionType } from '@types'
import './Select.scss'

type SelectInputProps = Omit<
  InputProps,
  | 'name'
  | 'label'
  | 'value'
  | 'type'
  | 'defaultValue'
  | 'autoComplete'
  | 'hideCursor'
  | 'disabled'
  | 'loading'
  | 'error'
  | 'clearable'
  | 'required'
  | 'ref'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onClear'
>

type SelectDropdownProps = Omit<DropdownProps, 'options' | 'onSelect' | 'toggle'>

export type SelectProps = {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  loading?: boolean
  error?: boolean
  innerRef?: RefObject<HTMLInputElement>

  input?: SelectInputProps // TODO find more elegant way to do this
  dropdown?: SelectDropdownProps

  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClear?: () => void
} & WithToggleProps &
  WithOptionSelectProps

export type SelectPropsWithHocs = SelectProps & WithOptionSelectPropsPassed & WithTogglePropsPassed

const Select: React.FC<SelectPropsWithHocs> = props => {
  const {
    name,
    label,
    input = {},
    dropdown = {},
    innerRef,
    options,
    selectedOption,
    toggle,
    disabled,
    loading,
    error,
    required,
    clearable,
    handleOptionSelect,
    handleToggle,
    onFocus,
    onBlur,
    onKeyDown,
    onClear
  } = props

  const handleSelectFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    /* If button in the suffix is clicked don't open the dropdown */
    if (e.target instanceof HTMLButtonElement) return

    handleToggle(true)
    if (onFocus) onFocus(e)
  }

  const handleSelectBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      handleToggle(false)
      if (onBlur) onBlur(e)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) onKeyDown(e)
    else {
      const isBackspaceKey = e.key === 'Backspace'

      if (isBackspaceKey && clearable) {
        handleOptionSelect(null)
      }
    }
  }

  const handleInputClear = () => {
    handleToggle(false)
    handleOptionSelect(null)
    if (onClear) onClear()
  }

  const handleDropdownSelect = (option: OptionType) => {
    handleOptionSelect(option)
    handleToggle(false)
  }

  /* If disabled no focus */
  const tabIndex = disabled ? -1 : 0
  const inputValue = (selectedOption && selectedOption.label) || ''

  const { suffix, ...otherInputProps } = input
  const { ...otherDropdownProps } = dropdown

  return (
    <div
      className={'select'}
      tabIndex={tabIndex}
      onFocus={handleSelectFocus}
      onBlur={handleSelectBlur}
      data-disabled={disabled}
    >
      <Input
        name={name}
        label={label}
        value={inputValue}
        ref={innerRef}
        onChange={() => null}
        onKeyDown={handleInputKeyDown}
        onClear={handleInputClear}
        disabled={disabled}
        autoComplete={'off'}
        loading={loading}
        error={error}
        clearable={clearable}
        required={required}
        hideCursor
        suffix={
          <div className={'select-input__suffix'}>
            <Icon className={'select-arrow'} name={'arrow'} data-toggle={toggle} />
            {suffix}
          </div>
        }
        {...otherInputProps}
      />
      <Dropdown options={options} toggle={toggle} onSelect={handleDropdownSelect} {...otherDropdownProps} />
    </div>
  )
}

Select.defaultProps = {
  input: {
    placeholder: 'Select an option'
  },
  dropdown: {}
}

export default withOptionSelect(withToggle(Select))
