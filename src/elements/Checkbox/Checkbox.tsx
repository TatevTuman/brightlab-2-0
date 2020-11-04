import React, { memo } from 'react'
import { FieldElement, FieldError, Ref, ValidationRules } from 'react-hook-form'
import styles from './Checkbox.module.scss'

export interface CheckboxProps {
  name?: string
  label?: string
  checked?: boolean
  validation?: ValidationRules
  register?<TFieldElement extends FieldElement>(ref: (TFieldElement & Ref) | null, rules?: ValidationRules): void
  error?: FieldError
  onChange?: (value: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = props => {
  const { name, label, checked, register, validation, error, onChange } = props

  const isRequired = !!validation?.required

  return (
    <label className={styles.checkbox}>
      {label && (
        <label htmlFor={name} data-required={isRequired}>
          {label}
        </label>
      )}
      <input
        id={name}
        type="checkbox"
        name={name}
        ref={register}
        checked={checked}
        onChange={e => onChange && onChange(!e.currentTarget.checked)}
      />
      <div className={styles.checkboxIndicator} />
      {error && <span className="validation-error">{error.message}</span>}
    </label>
  )
}

export default memo(Checkbox)
