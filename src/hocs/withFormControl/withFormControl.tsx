import React, { RefObject } from 'react'
import { Form, FormControlProps } from '@components'

export type WithFormControlProps<T> = {
  onChange?: (value: T) => void
} & Omit<FormControlProps, 'render'>

export type WithFormControlPropsPassed<T> = {
  value: T
  innerRef?: RefObject<any>
  onChange: (value: T) => void
}

export default <T, P>(WrappedComponent: React.ComponentType<WithFormControlPropsPassed<T> & P>) => {
  const FormControl: React.FC<WithFormControlProps<T> & Omit<P, 'value' | 'onChange'>> = props => {
    const { name, validation, ...parentProps } = props

    return (
      <Form.Control
        name={name}
        validation={validation}
        render={props => {
          const { value, ref, onChange } = props

          return (
            <WrappedComponent value={value} innerRef={ref} onChange={onChange} {...((parentProps as unknown) as P)} />
          )
        }}
      />
    )
  }

  FormControl.defaultProps = ({} as unknown) as WithFormControlProps<T> & P

  return FormControl
}
