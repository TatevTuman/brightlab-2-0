import React, { memo } from 'react'
import { ValidationProps } from '@types'
import styles from './Input.module.scss'

export interface InputProps extends ValidationProps {
  type?: string
  name: string
  label?: string
  value?: string
  onChange?: (value: string) => void
}

const Input: React.FC<InputProps> = props => {
  const { type, name, label, value, register, validation, errors, onChange } = props

  const isRequired = !!validation?.required
  const ref = register && register(validation)
  const error = errors && errors[name]

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
        ref={ref}
        value={value}
        onChange={e => onChange && onChange(e.currentTarget.value)}
      />
      {error && (
        <div role="input-error" className="validation-error">
          {error.message}
        </div>
      )}
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

export default memo(Input)
