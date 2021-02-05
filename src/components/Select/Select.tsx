import React, { RefObject } from 'react'
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
import SelectArrow from '@images/arrow.svg'
import styles from './Select.module.scss'

export type SelectProps = {
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

export type SelectPropsWithHocs = SelectProps & WithOptionSelectPropsPassed & WithTogglePropsPassed

const Select: React.FC<SelectPropsWithHocs> = props => {
  const {
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
    onFocus,
    onBlur,
    onKeyDown,
    onClear
  } = props

  const { label, placeholder, role, suffix, prefix, ...otherInputProps } = input

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

  return (
    <div
      className={styles.select}
      tabIndex={tabIndex}
      onFocus={handleSelectFocus}
      onBlur={handleSelectBlur}
      data-disabled={disabled}
    >
      <Input
        label={label}
        value={inputValue}
        placeholder={placeholder}
        ref={innerRef}
        onKeyDown={handleInputKeyDown}
        onClear={handleInputClear}
        disabled={disabled}
        autoComplete={'off'}
        error={error}
        role={role}
        clearable={clearable}
        focusable={false}
        prefix={prefix}
        suffix={
          <div className={styles.selectInputSuffix}>
            <SelectArrow className={styles.selectArrow} data-toggle={toggle} />
            {suffix}
          </div>
        }
        {...otherInputProps}
      />
      <Dropdown options={options} onSelect={handleDropdownSelect} toggle={toggle} direction={input.direction} />
    </div>
  )
}

Select.displayName = 'Select'
Select.defaultProps = {
  input: {}
}

export default withOptionSelect(withToggle(Select))
