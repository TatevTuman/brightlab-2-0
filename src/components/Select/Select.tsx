import React, { RefObject } from 'react'
import {
  withOptionSelect,
  WithOptionSelectProps,
  WithOptionSelectPropsPassed,
  withToggle,
  WithToggleProps,
  WithTogglePropsPassed
} from '@hocs'

import { Dropdown, DropdownProps, Input, InputProps } from '@elements'
import { OptionType } from '@types'
import SelectArrow from '@images/arrow.svg'
import './Select.scss'

type SelectInputProps = Omit<
  InputProps,
  | 'id'
  | 'label'
  | 'value'
  | 'type'
  | 'defaultValue'
  | 'autoComplete'
  | 'disabled'
  | 'error'
  | 'clearable'
  | 'required'
  | 'focusable'
  | 'min'
  | 'ref'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onClear'
>

export type SelectProps = {
  id: string
  label?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  focusable?: boolean
  error?: boolean
  innerRef?: RefObject<HTMLInputElement>

  input?: SelectInputProps

  onInputChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClear?: () => void
} & WithToggleProps &
  WithOptionSelectProps

export type SelectPropsWithHocs = SelectProps & WithOptionSelectPropsPassed & WithTogglePropsPassed

const Select: React.FC<SelectPropsWithHocs> = props => {
  const {
    id,
    label,
    input = {},
    innerRef,
    options,
    selectedOption,
    toggle,
    error,
    disabled,
    required,
    clearable,
    focusable,
    handleOptionSelect,
    handleToggle,
    onFocus,
    onBlur,
    onKeyDown,
    onClear
  } = props

  const handleSelectFocus = (e: React.FocusEvent<HTMLInputElement>) => {
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
  const tabIndex = focusable && !disabled ? 0 : -1
  const inputValue = (selectedOption && selectedOption.label) || ''

  const { suffix, ...otherInputProps } = input

  return (
    <div
      className={'select'}
      tabIndex={tabIndex}
      onFocus={handleSelectFocus}
      onBlur={handleSelectBlur}
      data-disabled={disabled}
    >
      <Input
        id={id}
        label={label}
        value={inputValue}
        ref={innerRef}
        onKeyDown={handleInputKeyDown}
        onClear={handleInputClear}
        disabled={disabled}
        autoComplete={'off'}
        error={error}
        clearable={clearable}
        required={required}
        focusable={false}
        suffix={
          <div className={'select-input__suffix'}>
            <SelectArrow className={'select-arrow'} data-toggle={toggle} />
            {suffix}
          </div>
        }
        {...otherInputProps}
      />
      <Dropdown options={options} toggle={toggle} onSelect={handleDropdownSelect} />
    </div>
  )
}

Select.defaultProps = {
  focusable: true,
  input: {},
}

export default withOptionSelect(withToggle(Select))
