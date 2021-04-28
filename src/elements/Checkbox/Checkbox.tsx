import React, { memo, forwardRef } from 'react'
import { handleEvent } from '@utils'
import './Checkbox.scss'

export interface CheckboxProps {
  name: string
  checked: boolean
  className?: string
  defaultChecked?: boolean
  label?: string
  disabled?: boolean
  error?: boolean
  required?: boolean
  onChange?: (value: boolean) => void
  onFocus?: (e: React.FocusEvent<HTMLLabelElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLLabelElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLLabelElement>) => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    name,
    label,
    checked,
    className,
    defaultChecked,
    disabled,
    error,
    required,
    onChange,
    onFocus,
    onBlur,
    onKeyDown
  } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleEvent(onChange, { value: !checked, disabled })
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => handleEvent(onBlur, { value: e, disabled })
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => handleEvent(onFocus, { value: e, disabled })
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => handleEvent(onKeyDown, { value: e, disabled })

  /* If disabled no focus */
  const tabIndex = disabled ? -1 : 0

  return (
    <div className={'checkbox ' + className} data-disabled={disabled}>
      <input
        id={name}
        name={name}
        ref={ref}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        tabIndex={tabIndex}
        data-testid={'checkbox'}
        data-error={error}
      />
      {label && (
        <label htmlFor={name} data-required={required}>
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'
Checkbox.defaultProps = {}

export default memo(Checkbox)
