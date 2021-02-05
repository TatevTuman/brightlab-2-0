import React, { memo, forwardRef } from 'react'
import { handleEvent } from '@utils'
import TimesImage from '@images/times.svg'
import NotAllowedImage from '@images/not-allowed.svg'
import styles from './Input.module.scss'

export type InputSuffixProp = JSX.Element | string | number
export interface InputProps {
  value: string
  type?: string
  label?: string
  defaultValue?: string
  placeholder?: string
  prefix?: InputSuffixProp
  suffix?: InputSuffixProp

  direction?: 'horizontal' | 'vertical'
  autoComplete?: 'on' | 'off'
  disabled?: boolean
  error?: boolean
  clearable?: boolean
  required?: boolean
  focusable?: boolean
  role?: string
  min?: number

  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClear?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    value,
    type,
    label,
    defaultValue,
    placeholder,
    prefix,
    suffix,
    direction,
    autoComplete,
    disabled,
    error,
    clearable,
    required,
    focusable,
    role,
    min,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onClear
  } = props

  /* If disabled no focus */
  const tabIndex = focusable && !disabled ? 0 : -1

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleEvent(onBlur, { value: e, disabled })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEvent(onChange, { value: e.currentTarget.value, disabled })
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => handleEvent(onFocus, { value: e, disabled })
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => handleEvent(onKeyDown, { value: e, disabled })
  const handleClear = () => {
    if (!disabled) {
      onChange && onChange('')
    }
  }

  return (
    <div className={styles.input} data-disabled={disabled} data-direction={direction}>
      {label && (
        <label htmlFor={name} data-required={required}>
          {label}
        </label>
      )}
      <div className={styles.inputInner}>
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
          min={min}
        />
        <div className={styles.inputInnerPrefix}>{prefix}</div>
        <div className={styles.inputInnerSuffix}>
          {clearable && <TimesImage className={styles.inputInnerSuffixTimes} onClick={onClear || handleClear} />}
          {disabled && <NotAllowedImage className={styles.inputInnerSuffixNotAllowed} />}
          {suffix}
        </div>
      </div>
    </div>
  )
})

Input.defaultProps = {
  type: 'text',
  placeholder: 'Type a text',
  autoComplete: 'on',
  direction: 'vertical',
  focusable: true
}

Input.displayName = 'Input'

export default memo(Input)
