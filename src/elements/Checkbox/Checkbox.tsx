import React, { memo, forwardRef } from 'react'
import { handleEvent } from '@utils'
import './Checkbox.scss'

export interface CheckboxProps {
  name: string
  checked: boolean
  defaultChecked?: boolean
  label?: string
  disabled?: boolean
  required?: boolean
  onChange?: (value: boolean) => void
  onFocus?: (e: React.FocusEvent<HTMLLabelElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLLabelElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLLabelElement>) => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { name, label, checked, defaultChecked, disabled, required, onChange, onFocus, onBlur, onKeyDown } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleEvent(onChange, { value: !checked, disabled })
  const handleBlur = (e: React.FocusEvent<HTMLLabelElement>) => handleEvent(onBlur, { value: e, disabled })
  const handleFocus = (e: React.FocusEvent<HTMLLabelElement>) => handleEvent(onFocus, { value: e, disabled })
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => handleEvent(onKeyDown, { value: e, disabled })

  /* If disabled no focus */
  const tabIndex = disabled ? -1 : 0

  return (
    <label
      className={'checkbox'}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
    >
      {label && (
        <label htmlFor={name} data-required={required}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        ref={ref}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        tabIndex={-1}
      />
      <div className={'checkbox-indicator'} data-testid={'checkbox'} />
    </label>
  )
})

Checkbox.displayName = 'Checkbox'
Checkbox.defaultProps = {}

export default memo(Checkbox)
