import React, { memo } from 'react'
import { FieldElement, Ref, ValidationRules, FieldError } from 'react-hook-form'
import styles from './Input.module.scss'

export interface InputProps {
  type?: string
  name: string
  label?: string
  value?: string
  validation?: ValidationRules
  register?<TFieldElement extends FieldElement>(ref: (TFieldElement & Ref) | null, rules?: ValidationRules): void
  error?: FieldError
  onChange?: (value: string) => void
}

const Input: React.FC<InputProps> = props => {
  const { type, name, label, value, register, validation, error, onChange } = props

  const isRequired = !!validation?.required

  return (
    <div className={styles.input}>
      {label && (
        <label htmlFor={name} data-required={isRequired}>
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        ref={register}
        value={value}
        onChange={e => onChange && onChange(e.currentTarget.value)}
      />
      {error && <span className="validation-error">{error.message}</span>}
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

export default memo(Input)
