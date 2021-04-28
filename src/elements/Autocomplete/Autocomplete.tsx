import React, { useState, useEffect, RefObject } from 'react'
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
import './Autocomplete.scss'

type AutocompleteInputProps = Omit<
  InputProps,
  | 'name'
  | 'label'
  | 'value'
  | 'type'
  | 'defaultValue'
  | 'autoComplete'
  | 'hideCursor'
  | 'disabled'
  | 'error'
  | 'loading'
  | 'clearable'
  | 'required'
  | 'ref'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onClear'
>

type AutocompleteDropdownProps = Omit<DropdownProps, 'options' | 'onSelect' | 'toggle'>

export type AutocompleteProps = {
  name: string
  label?: string
  initialSearch?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  error?: boolean
  loading?: boolean
  innerRef?: RefObject<HTMLInputElement>

  input?: AutocompleteInputProps
  dropdown?: AutocompleteDropdownProps

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
    name,
    label,
    initialSearch,
    input = {},
    dropdown = {},
    innerRef,
    options,
    selectedOption,
    toggle,
    error,
    loading,
    disabled,
    required,
    clearable,
    handleOptionSelect,
    handleToggle,
    onInputChange,
    onFocus,
    onBlur,
    onKeyDown,
    onClear
  } = props

  const [autocomplete, setAutocomplete] = useState(initialSearch || '')

  useEffect(() => {
    if (selectedOption) {
      setAutocomplete('')
    }
  }, [selectedOption])

  const handleInputChange = (value: string) => {
    handleOptionSelect(null)
    handleToggle(true)
    setAutocomplete(value)

    if (onInputChange) onInputChange(value)
  }

  const handleAutocompleteFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    /* If button in the suffix is clicked don't open the dropdown */
    if (e.target instanceof HTMLButtonElement) return

    handleToggle(true)
    if (onFocus) onFocus(e)
  }

  const handleAutocompleteBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      if (!selectedOption) setAutocomplete('')

      handleToggle(false)
      if (onBlur) onBlur(e)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) onKeyDown(e)
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
  const tabIndex = disabled ? -1 : 0

  const { suffix, ...otherInputProps } = input
  const { ...otherDropdownProps } = dropdown

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
        name={name}
        label={label}
        value={selectedOption?.label || autocomplete}
        ref={innerRef}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onClear={handleInputClear}
        autoComplete={'off'}
        disabled={disabled}
        error={error}
        clearable={clearable}
        loading={loading}
        required={required}
        suffix={
          <div className={'autocomplete-input__suffix'}>
            <Icon className={'autocomplete-arrow'} name={'arrow'} data-toggle={toggle} />
            {suffix}
          </div>
        }
        {...otherInputProps}
      />
      <Dropdown options={filteredOptions} toggle={toggle} onSelect={handleDropdownSelect} {...otherDropdownProps} />
    </div>
  )
}

Autocomplete.defaultProps = {
  input: {
    placeholder: 'Select an option'
  },
  dropdown: {}
}

export default withOptionSelect(withToggle(Autocomplete))
