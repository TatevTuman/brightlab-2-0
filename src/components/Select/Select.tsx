import React, { RefObject } from 'react'
import {
  withOptionSelect,
  WithOptionSelectProps,
  WithOptionSelectPropsPassed,
  withToggle,
  WithToggleProps,
  WithTogglePropsPassed
} from '@hocs'

import { Dropdown, Input, InputProps } from '@elements'
import { OptionType } from '@types'
import SelectArrow from '@images/arrow.svg'
import './Select.scss'

type SelectInputProps = Omit<
  InputProps,
  | 'name'
  | 'label'
  | 'value'
  | 'type'
  | 'defaultValue'
  | 'autoComplete'
  | 'disabled'
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

export type SelectProps = {
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  error?: boolean
  innerRef?: RefObject<HTMLInputElement>

  input?: SelectInputProps // TODO find more elegant way to do this

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
    name,
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
  const tabIndex = disabled ? -1 : 0
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
        name={name}
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
  input: {}
}

export default withOptionSelect(withToggle(Select))
