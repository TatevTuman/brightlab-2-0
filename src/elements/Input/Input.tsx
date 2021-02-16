import React, { memo, forwardRef, RefObject } from 'react'
import { handleEvent } from '@utils'
import TimesImage from '@images/times.svg'
import './Input.scss'

export type InputSuffixProp = JSX.Element | string | number
export interface InputProps {
  name: string
  value: string
  type?: string
  label?: string
  defaultValue?: string
  placeholder?: string
  prefix?: InputSuffixProp
  suffix?: InputSuffixProp

  autoComplete?: 'on' | 'off'
  disabled?: boolean
  error?: boolean
  clearable?: boolean
  required?: boolean
  focusable?: boolean
  role?: string
  ref?: RefObject<HTMLInputElement>

  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClear?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    name,
    value,
    type,
    label,
    defaultValue,
    placeholder,
    prefix,
    suffix,
    autoComplete,
    disabled,
    error,
    clearable,
    required,
    focusable,
    role,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onClear
  } = props

  /* If disabled or not focusable no focus */
  const tabIndex = focusable && !disabled ? 0 : -1

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEvent(onChange, { value: e.currentTarget.value, disabled })
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => handleEvent(onBlur, { value: e, disabled })
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => handleEvent(onFocus, { value: e, disabled })
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => handleEvent(onKeyDown, { value: e, disabled })
  const handleClear = () => {
    if (!disabled) {
      onChange && onChange('')
    }
  }

  return (
    <div className={'input'} data-disabled={disabled}>
      {label && (
        <label htmlFor={name} data-required={required}>
          {label}
        </label>
      )}
      <div className={'input-inner'}>
        <input
          id={name}
          type={type}
          name={name}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          data-disabled={disabled}
          data-cursor={autoComplete !== 'off'}
          data-prefix={!!prefix}
          data-suffix={!!suffix}
          data-error={!!error}
          data-clearable={clearable}
          role={role}
          tabIndex={tabIndex}
        />
        <div className={'input-inner__prefix'}>{prefix}</div>
        <div className={'input-inner__suffix'}>
          {clearable && <TimesImage className={'input-inner__suffix-times'} onClick={onClear || handleClear} />}
          {suffix}
        </div>
      </div>
    </div>
  )
})

Input.displayName = 'Input'
Input.defaultProps = {
  type: 'text',
  placeholder: 'Type a text',
  autoComplete: 'on',
  focusable: true,
  clearable: true
}

export default memo(Input)
