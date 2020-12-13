import React, { memo } from 'react'
import { ReactHookFormProps } from '@types'
import { handleEvent } from '@utils'
import { ValidationErrorMessage } from '@elements'
import styles from './Input.module.scss'

type InputSuffixProp = JSX.Element | string | number
export interface InputProps extends ReactHookFormProps {
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
  disabled?: boolean
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
    errors,
    trigger,
    disabled
  } = props

  /* Is required check */
  const isRequired = !!validation?.required
  /* Register input in parent form */
  const ref = register && register(validation)
  /* If disabled no focus */
  const tabIndex = disabled ? -1 : 0

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleEvent(onBlur, { value: e, disabled })
    handleEvent(trigger, { value: name, disabled })
  }

  return (
    <div className={styles.input} data-disabled={disabled}>
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
          onChange={e => handleEvent(onChange, { value: e.currentTarget.value, disabled })}
          onFocus={e => handleEvent(onFocus, { value: e, disabled })}
          onKeyDown={e => handleEvent(onKeyDown, { value: e, disabled })}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          data-disabled={disabled}
          data-cursor={!noCursor}
          tabIndex={tabIndex}
        />
        <div className={styles.inputInnerSuffix}>{suffix}</div>
      </div>
      <ValidationErrorMessage name={name} errors={errors} />
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
  placeholder: 'Type a text',
  autoComplete: 'on'
}

export default memo(Input)
