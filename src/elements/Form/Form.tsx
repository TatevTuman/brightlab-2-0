/* eslint-disable react/display-name */

import React, { memo, forwardRef, ReactElement, RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler, SubmitErrorHandler, UnpackNestedValue, DeepPartial, ValidationRules } from 'react-hook-form'
import './Form.scss'

export interface FormProps<F> {
  defaultValues?: UnpackNestedValue<DeepPartial<F>>
  children: JSX.Element | JSX.Element[]
  onSubmit: SubmitHandler<F>
  onError?: SubmitErrorHandler<F>
  ref?: RefObject<HTMLFormElement>
}

export type FormChildProp<F> = ReactElement<{ name: keyof F; validation: ValidationRules }>

const formWithForwardedRef = <F,>() =>
  memo(
    forwardRef<HTMLFormElement, FormProps<F>>((props, ref) => {
      const { defaultValues, onSubmit, onError, children } = props
      const { register, handleSubmit, errors } = useForm<F>({ defaultValues })

      return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit, onError)}>
          {React.Children.map(children, (child: FormChildProp<F>) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: register(child.props.validation),
                    error: errors[child.props.name],
                    key: child.props.name
                  }
                })
              : child
          })}
        </form>
      )
    })
  )

const Form = <F,>(props: FormProps<F>) => {
  const FormWithForwardedRef = formWithForwardedRef<F>()
  return <FormWithForwardedRef {...props} />
}

export default Form
