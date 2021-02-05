import React, { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button, ButtonProps, ButtonEvents } from '@elements'
import styles from '../../Form.module.scss'

export type FormSubmitProps = {} & Omit<ButtonProps, 'submit'>

/*
  Component controls form loading state to render different state.
  Handling loading with usual state doesn't work because of inner react-hook-form logic.

  Renders button component with setValue logic on click
  TODO Research
*/
const FormSubmit: React.FC<FormSubmitProps> = props => {
  const { form, children, onClick, ...buttonProps } = props
  const { setValue, watch, control } = useFormContext()
  const loading = buttonProps.loading !== undefined ? buttonProps.loading : watch && watch('loading')

  /* Component renders */
  const submitForm = (e: ButtonEvents) => {
    buttonProps.loading !== undefined && e.preventDefault()

    setValue &&
      setValue('loading', true, {
        shouldValidate: false,
        shouldDirty: true
      })

    onClick && onClick(e)
  }

  return (
    <Controller
      render={() => (
        <Button
          {...buttonProps}
          className={styles.formSubmit}
          onClick={submitForm}
          loading={loading}
          submit
          form={form}
        >
          {children}
        </Button>
      )}
      name={'loading'}
      control={control}
      defaultValue={false}
    />
  )
}

FormSubmit.defaultProps = {
  size: 'md',
  centered: true
}

export default memo(FormSubmit)
