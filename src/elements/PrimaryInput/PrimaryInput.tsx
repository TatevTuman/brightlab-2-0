import React, { memo, forwardRef, RefObject } from 'react'
import { Loader, Icon } from '@elements'
import { handleEvent } from '@utils'
import './PrimaryInput.scss'

export type PrimaryInputSuffixProp = JSX.Element | string | number
export interface PrimaryInputProps {
  name: string
  value: string
  type?: string
  label?: string
  defaultValue?: string
  placeholder?: string
  prefix?: PrimaryInputSuffixProp
  suffix?: PrimaryInputSuffixProp

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

const PrimaryInput = forwardRef<HTMLInputElement, PrimaryInputProps>((props, ref) => {
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
    <label className={'primary-input'} data-disabled={disabled}>
      {label && (
        <label htmlFor={name} data-required={required} className=" fs-15 fw-600">
          {label}
        </label>
      )}
      <div className={'primary-input-inner'} data-error={!!error} data-testid={'inner'}>
        <div className={'primary-input-inner__prefix'}>{prefix}</div>
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
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-nocursor={hideCursor}
          data-testid={'input'}
          role={role}
          tabIndex={tabIndex}
        />
        <div className={'primary-input-inner__suffix'}>
          {loading && <Loader type={'Oval'} width={16} height={16} />}
          {clearable && (
            <Icon
              name={'times'}
              className={'primary-input-inner__suffix-times'}
              data-testid={'primary-input-times'}
              onClick={onClear || handleClear}
            />
          )}
          {suffix}
        </div>
      </div>
    </label>
  )
})

PrimaryInput.displayName = 'PrimaryInput'
PrimaryInput.defaultProps = {
  type: 'text',
  autoComplete: 'on',
  clearable: true
}

export default memo(PrimaryInput)
