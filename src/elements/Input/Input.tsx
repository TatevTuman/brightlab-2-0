import React, { memo, forwardRef, RefObject } from 'react'
import { Loader, Icon } from '@elements'
import { handleEvent } from '@utils'
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
  hideCursor?: boolean
  disabled?: boolean
  loading?: boolean
  error?: boolean
  clearable?: boolean
  required?: boolean
  role?: string
  ref?: RefObject<HTMLInputElement>

  onChange: (value: string) => void
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
    hideCursor,
    disabled,
    error,
    loading,
    clearable,
    required,
    role,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onClear
  } = props

  /* If disabled no focus */
  const tabIndex = disabled ? -1 : 0

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
        <label className={'fw-700 fs-15 mb-4 primary'} htmlFor={name} data-required={required}>
          {label}
        </label>
      )}
      <div className={'input-inner'} data-error={error}>
        <div className={'input-inner__prefix'}>{prefix}</div>
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
          data-nocursor={hideCursor}
          data-testid={'input'}
          role={role}
          tabIndex={tabIndex}
        />
        <div className={'input-inner__suffix'}>
          {loading && <Loader type={'Oval'} width={16} height={16} style={{ width: 'auto', padding: '0' }} />}
          {clearable && (
            <Icon
              className={'input-inner__suffix-times'}
              name={'times'}
              onClick={onClear || handleClear}
              data-testid={'input-times'}
            />
          )}
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
  clearable: true
}

export default memo(Input)
