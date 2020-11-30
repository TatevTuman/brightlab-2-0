import React, { memo, useEffect } from 'react'
import { ValidationProps } from '@types'
import styles from './Checkbox.module.scss'

export interface CheckboxProps extends ValidationProps {
  name: string
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = props => {
  const { name, label, checked, disabled, register, validation, errors, onChange } = props

  const isRequired = !!validation?.required
  const ref = register && register(validation)
  const error = errors && errors[name]

  const handleKeyDown = (e: { key: string }) => {
    const checkbox = document.getElementById(name)
    const isEnterKey = e.key === 'Enter'

    if (isEnterKey) {
      if (onChange) onChange(!checked)
      else if (checkbox) (checkbox as HTMLInputElement).checked = !checked
    }
  }

  return (
    <label className={styles.checkbox} onKeyDown={handleKeyDown} tabIndex={0}>
      {label && (
        <label htmlFor={name} data-required={isRequired}>
          {label}
        </label>
      )}
      <input
        id={name}
        type="checkbox"
        name={name}
        ref={ref}
        checked={checked}
        disabled={disabled}
        onChange={e => onChange && onChange(!e.currentTarget.checked)}
        tabIndex={-1}
      />
      <div className={styles.checkboxIndicator} />
      {error && <span className={`${styles.checkboxValidationError} validation-error`}>{error.message}</span>}
    </label>
  )
}

export default memo(Checkbox)
