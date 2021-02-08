import React, { memo } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { ValidationErrorMessage } from '@elements'
import styles from './Checkbox.module.scss'

export interface CheckboxProps {
  name: string
  label?: string
  checked?: boolean
  disabled?: boolean
  validation?: RegisterOptions
  onChange?: (value: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {
  const { name, label, checked, disabled, validation, onChange } = props

  const formContext = useFormContext()

  const register = formContext && formContext.register

  const isRequired = !!validation?.required
  const ref = register && register(validation)

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
      <ValidationErrorMessage
        name={name}
        render={(error, className) => {
          return <span className={`${styles.checkboxValidationError} ${className}`}>{error.message}</span>
        }}
      />
    </label>
  )
}

export default memo(Checkbox)
