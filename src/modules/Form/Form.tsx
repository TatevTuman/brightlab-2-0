import React from 'react'
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
import { genericMemo } from '@hocs'
import './Form.scss'

export interface FormProps<F> {
  id?: string
  className?: string
  defaultValues?: UnpackNestedValue<DeepPartial<F>>
  children: (props: UseFormMethods<F>) => Children
  onSubmit: (form: UnpackNestedValue<F>, event?: React.BaseSyntheticEvent) => void
  onError: SubmitErrorHandler<F>
}

/*
  Form component that uses react-hook-form lib to manage form state without React state.

  Loading state is implemented via FormSubmit component that controls loading field like input in the form
  You can add here any logic you want to improve UX
*/

const Form = <F,>(props: FormProps<F>) => {
  const { id, className, defaultValues, onSubmit, onError, children } = props
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
        id={id}
        className={'form ' + className}
        onSubmit={useFormMethods.handleSubmit<F>(handleFormSubmit, handleFormError)}
        noValidate
        data-testid={'form'}
      >
        {children(useFormMethods)}
      </form>
    </FormProvider>
  )
}

export default genericMemo(Form)
