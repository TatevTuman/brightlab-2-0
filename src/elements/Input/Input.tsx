import React, { memo } from 'react'
import { FieldElement, Ref, ValidationRules, FieldError } from 'react-hook-form/dist/types/form'
import './Input.scss'

interface InputProps {
  name: string
  label?: string
  validation?: ValidationRules
  register?<TFieldElement extends FieldElement>(ref: (TFieldElement & Ref) | null, rules?: ValidationRules): void
  error?: FieldError
}

const Input: React.FC<InputProps> = props => {
  const { name, label, register, validation, error, ...rest } = props

  const isRequired = !!validation?.required

  return (
    <div className="control">
      {label && (
        <label htmlFor={name} data-required={isRequired}>
          {label}
        </label>
      )}
      <input name={name} ref={register} {...rest} />
      {error && <span className="validation-error">{error.message}</span>}
    </div>
  )
}

export default memo(Input)
