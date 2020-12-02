import React, { memo } from 'react'
import { ValidationProps } from '@types'
import styles from './Input.module.scss'

type InputSuffixProp = JSX.Element | string | number
export interface InputProps extends ValidationProps {
  type?: string
  name: string
  label?: string
  value?: string
  placeholder?: string
  autoComplete?: 'on' | 'off'
  suffix?: InputSuffixProp
  onChange?: (value: string) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  noCursor?: boolean
}

const Input: React.FC<InputProps> = props => {
  const {
    type,
    name,
    label,
    value,
    placeholder,
    autoComplete,
    suffix,
    onChange,
    noCursor,
    onFocus,
    onBlur,
    onKeyDown,
    register,
    validation,
    errors
  } = props

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
      <div className={styles.inputInner}>
        <input
          id={name}
          type={type}
          name={name}
          ref={ref}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange && onChange(e.currentTarget.value)}
          onFocus={e => onFocus && onFocus(e)}
          onBlur={e => onBlur && onBlur(e)}
          onKeyDown={e => onKeyDown && onKeyDown(e)}
          autoComplete={autoComplete}
          data-cursor={!noCursor}
        />
        <div className={styles.inputInnerSuffix}>{suffix}</div>
      </div>
      {error && (
        <div role="input-error" className="validation-error">
          {error.message}
        </div>
      )}
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
  placeholder: 'Type a text',
  autoComplete: 'on'
}

export default memo(Input)
