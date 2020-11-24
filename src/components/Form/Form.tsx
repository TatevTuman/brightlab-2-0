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
import { FormItem } from './components'
import styles from './Form.module.scss'

export interface FormProps<F> {
  defaultValues?: UnpackNestedValue<DeepPartial<F>>
  children: (props: UseFormMethods<F>) => Children
  onSubmit: SubmitHandler<F>
  onError?: SubmitErrorHandler<F>
  ref?: RefObject<HTMLFormElement>
}

const Form = <F,>(props: FormProps<F>) => {
  const ForwardRefWrapper = memo(
    forwardRef<HTMLFormElement, FormProps<F>>((props, ref) => {
      const { defaultValues, onSubmit, onError, children } = props
      const useFormMethods = useForm<F>({ defaultValues })

      return (
        <form className={styles.form} ref={ref} onSubmit={useFormMethods.handleSubmit(onSubmit, onError)}>
          {children(useFormMethods)}
        </form>
      )
    })
  )

  ForwardRefWrapper.displayName = 'Form'

  return <ForwardRefWrapper {...props} />
}

Form.Item = FormItem

export default Form
