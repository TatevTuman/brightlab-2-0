import React, { memo } from 'react'
import { ReactHookFormProps } from '@types'
import { ValidationErrorMessage } from '@elements'
import styles from './Checkbox.module.scss'

export interface CheckboxProps extends ReactHookFormProps {
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
        errors={errors}
        render={(error, className) => {
          return <span className={`${styles.checkboxValidationError} ${className}`}>{error.message}</span>
        }}
      />
    </label>
  )
}

export default memo(Checkbox)
