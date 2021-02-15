import React, { memo, forwardRef } from 'react'
import styles from './Checkbox.module.scss'
import { handleEvent } from '@utils'

export interface CheckboxProps {
  id: string
  checked: boolean
  defaultChecked?: boolean
  label?: string
  disabled?: boolean
  required?: boolean
  focusable?: boolean
  onChange?: (value: boolean) => void
  onFocus?: (e: React.FocusEvent<HTMLLabelElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLLabelElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLLabelElement>) => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    id,
    label,
    checked,
    defaultChecked,
    disabled,
    required,
    focusable,
    onChange,
    onFocus,
    onBlur,
    onKeyDown
  } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleEvent(onChange, { value: !checked, disabled })
  const handleBlur = (e: React.FocusEvent<HTMLLabelElement>) => handleEvent(onBlur, { value: e, disabled })
  const handleFocus = (e: React.FocusEvent<HTMLLabelElement>) => handleEvent(onFocus, { value: e, disabled })
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => handleEvent(onKeyDown, { value: e, disabled })

  /* If disabled or not focusable no focus */
  const tabIndex = focusable && !disabled ? 0 : -1

  return (
    <label
      className={styles.checkbox}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
    >
      {label && (
        <label htmlFor={id} data-required={required}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        ref={ref}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        tabIndex={-1}
      />
      <div className={styles.checkboxIndicator} />
    </label>
  )
})

Checkbox.displayName = 'Checkbox'
Checkbox.defaultProps = {
  focusable: true
}

export default memo(Checkbox)
