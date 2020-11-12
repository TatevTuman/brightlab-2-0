/* eslint-disable react/display-name */

import React, { memo, forwardRef, RefObject } from 'react'
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  UnpackNestedValue,
  DeepPartial,
  UseFormMethods
} from 'react-hook-form'
import { Children } from '@types'
import styles from './Form.module.scss'

export interface FormProps<F> {
  defaultValues?: UnpackNestedValue<DeepPartial<F>>
  children: (props: UseFormMethods<F>) => Children
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

export interface FormItemProps {
  children: Children
}

const FormItem: React.FC<FormItemProps> = ({ children }) => {
  return <div className={styles.formItem}>{children}</div>
}

export interface FormItemProps {
  children: Children
}

const Form = <F,>(props: FormProps<F>) => {
  const FormWithForwardedRef = formWithForwardedRef<F>()
  return <FormWithForwardedRef {...props} />
}

Form.FormItem = FormItem

export default Form
