/* eslint-disable react/display-name */

import React, { memo, forwardRef, RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler, SubmitErrorHandler, UnpackNestedValue, DeepPartial, UseFormMethods } from 'react-hook-form'
import './Form.scss'

export interface FormProps<F> {
  defaultValues?: UnpackNestedValue<DeepPartial<F>>
  children: (props: UseFormMethods<F>) => JSX.Element | JSX.Element[]
  onSubmit: SubmitHandler<F>
  onError?: SubmitErrorHandler<F>
  ref?: RefObject<HTMLFormElement>
}

const formWithForwardedRef = <F,>() => {
  const forwardRefWrapper = forwardRef<HTMLFormElement, FormProps<F>>((props, ref) => {
    const { defaultValues, onSubmit, onError, children } = props
    const useFormMethods = useForm<F>({ defaultValues })

    return (
      <form ref={ref} onSubmit={useFormMethods.handleSubmit(onSubmit, onError)}>
        {children(useFormMethods)}
      </form>
    )
  })

  forwardRefWrapper.displayName = 'Form'

  return memo(forwardRefWrapper)
}

const Form = <F,>(props: FormProps<F>) => {
  const FormWithForwardedRef = formWithForwardedRef<F>()
  return <FormWithForwardedRef {...props} />
}

export default Form
