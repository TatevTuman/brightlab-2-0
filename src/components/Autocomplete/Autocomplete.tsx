import React, { useState, RefObject } from 'react'
import {
  withOptionSelect,
  WithOptionSelectProps,
  WithOptionSelectPropsPassed,
  withToggle,
  WithToggleProps,
  WithTogglePropsPassed
} from '@hocs'

import { Dropdown, Input, InputSuffixProp } from '@elements'
import { OptionType } from '@types'
import AutocompleteArrow from '@images/arrow.svg'
import styles from './Autocomplete.module.scss'

export type AutocompleteProps = {
  id: string
  disabled?: boolean
  clearable?: boolean
  error?: boolean
  innerRef?: RefObject<HTMLInputElement>

  input?: {
    label?: string
    placeholder?: string
    role?: string
    direction?: 'horizontal' | 'vertical'
    suffix?: InputSuffixProp
    prefix?: InputSuffixProp
  }

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
    input = {},
    innerRef,
    options,
    selectedOption,
    toggle,
    error,
    disabled,
    clearable,
    handleOptionSelect,
    handleToggle,
    onInputChange,
    onFocus,
    onBlur,
    onKeyDown,
    onClear
  } = props

  const { label, placeholder, role, suffix, prefix, ...otherInputProps } = input

  const [autocomplete, setAutocomplete] = useState('')

  const handleInputChange = (value: string) => {
    handleOptionSelect(null)
    setAutocomplete(value)
    if (onInputChange) onInputChange(value)
  }

  const handleAutocompleteFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    handleToggle(true)
    if (onFocus) onFocus(e)
  }

  const handleAutocompleteBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

  return (
    <div
      className={styles.autocomplete}
      tabIndex={tabIndex}
      onFocus={handleAutocompleteFocus}
      onBlur={handleAutocompleteBlur}
      data-disabled={disabled}
    >
      <Input
        id={id}
        label={label}
        value={autocomplete}
        placeholder={placeholder}
        ref={innerRef}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onClear={handleInputClear}
        disabled={disabled}
        error={error}
        role={role}
        clearable={clearable}
        focusable={false}
        prefix={prefix}
        suffix={
          <div className={styles.autocompleteInputSuffix}>
            <AutocompleteArrow className={styles.autocompleteArrow} data-toggle={toggle} />
            {suffix}
          </div>
        }
        {...otherInputProps}
      />
      <Dropdown options={options} onSelect={handleDropdownSelect} toggle={toggle} direction={input.direction} />
    </div>
  )
}

Autocomplete.defaultProps = {
  input: {}
}

export default withOptionSelect(withToggle(Autocomplete))
