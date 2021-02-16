import React, { useState, RefObject } from 'react'
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
import AutocompleteArrow from '@images/arrow.svg'
import './Autocomplete.scss'

type AutocompleteInputProps = Omit<
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

export type AutocompleteProps = {
  id: string
  label?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  focusable?: boolean
  error?: boolean
  innerRef?: RefObject<HTMLInputElement>

  input?: AutocompleteInputProps

  onInputChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClear?: () => void
} & WithToggleProps &
  WithOptionSelectProps

export type AutocompletePropsWithHocs = AutocompleteProps & WithOptionSelectPropsPassed & WithTogglePropsPassed

const Autocomplete: React.FC<AutocompletePropsWithHocs> = props => {
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
    onInputChange,
    onFocus,
    onBlur,
    onKeyDown,
    onClear
  } = props

  const [autocomplete, setAutocomplete] = useState('')

  const handleInputChange = (value: string) => {
    handleOptionSelect(null)
    setAutocomplete(value)
    if (onInputChange) onInputChange(value)
  }

  const handleAutocompleteFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    handleToggle(true)
    innerRef?.current?.focus()
    if (onFocus) onFocus(e)
  }

  const handleAutocompleteBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      if (!selectedOption) setAutocomplete('')

      handleToggle(false)
      innerRef?.current?.blur()
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
    handleOptionSelect(null)
    setAutocomplete('')
    if (onClear) onClear()
  }

  const handleDropdownSelect = (option: OptionType) => {
    handleOptionSelect(option)
    setAutocomplete(option.label)
    handleToggle(false)
  }

  /* If disabled no focus */
  const tabIndex = focusable && !disabled ? 0 : -1

  const { suffix, ...otherInputProps } = input

  const filteredOptions = options.filter(option => option.label.toLowerCase().includes(autocomplete.toLowerCase()))

  return (
    <div
      className={'autocomplete'}
      tabIndex={tabIndex}
      onFocus={handleAutocompleteFocus}
      onBlur={handleAutocompleteBlur}
      data-disabled={disabled}
    >
      <Input
        id={id}
        label={label}
        value={autocomplete}
        ref={innerRef}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onClear={handleInputClear}
        disabled={disabled}
        error={error}
        clearable={clearable}
        required={required}
        focusable={false}
        suffix={
          <div className={'autocomplete-input__suffix'}>
            <AutocompleteArrow className={'autocomplete-arrow'} data-toggle={toggle} />
            {suffix}
          </div>
        }
        {...otherInputProps}
      />
      <Dropdown options={filteredOptions} toggle={toggle} onSelect={handleDropdownSelect} />
    </div>
  )
}

Autocomplete.defaultProps = {
  focusable: true,
  input: {}
}

export default withOptionSelect(withToggle(Autocomplete))
