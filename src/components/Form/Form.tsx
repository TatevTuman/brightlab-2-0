import React, { memo, forwardRef, RefObject } from 'react'
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  UnpackNestedValue,
  DeepPartial,
  UseFormMethods,
  FieldName,
  FormProvider
} from 'react-hook-form'
import { Children } from '@types'
import { FormItem, FormSubmit } from './components'
import styles from './Form.module.scss'

export interface FormProps<F> {
  defaultValues?: UnpackNestedValue<DeepPartial<F>>
  children: (props: UseFormMethods<F>) => Children
  onSubmit: SubmitHandler<F>
  onError: SubmitErrorHandler<F>
  ref?: RefObject<HTMLFormElement>
}

/*
  Form component that uses react-hook-form lib to manage form state without React state.
  Forward ref is used in awkward way because of Typescript genetic argument to pass it in useForm hook.
  TODO Research

  Loading state is implemented via FormSubmit component that controls loading field like input in the form
  You can add here any logic you want to improve UX
*/

const Form = <F,>(props: FormProps<F>) => {
  const ForwardRefWrapper = memo(
    forwardRef<HTMLFormElement, FormProps<F>>((props, ref) => {
      const { defaultValues, onSubmit, onError, children } = props
      const useFormMethods = useForm<F>({ defaultValues })

      /* FormSubmit component controls loading field, so we can manage button state with react-hook-form */
      const setFormLoading = () =>
        setTimeout(
          () =>
            useFormMethods.setValue('loading' as FieldName<F>, false, {
              shouldValidate: false,
              shouldDirty: true
            }),
          500
        )

      /* Custom form submit handler */
      const handleFormSubmit: SubmitHandler<F> = async (form, event) => {
        await onSubmit(form, event)
        /* Set FormSubmit loading to false */
        setFormLoading()
      }

      /* Custom form error handler */
      const handleFormError: SubmitErrorHandler<F> = async (errors, event) => {
        await onError(errors, event)
        /* Set FormSubmit loading to false */
        setFormLoading()
      }

      return (
        <FormProvider {...useFormMethods}>
          <form
            className={styles.form}
            ref={ref}
            onSubmit={useFormMethods.handleSubmit<F>(handleFormSubmit, handleFormError)}
          >
            {children(useFormMethods)}
          </form>
        </FormProvider>
      )
    })
  )

  ForwardRefWrapper.displayName = 'Form'

  return <ForwardRefWrapper {...props} />
}

Form.Item = FormItem
Form.Submit = FormSubmit

export default Form
