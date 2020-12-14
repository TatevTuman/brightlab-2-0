import React, { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button, ButtonProps } from '@elements'
import styles from '../../Form.module.scss'

export type FormSubmitProps = Omit<ButtonProps, 'submit'>

/*
  Component controls form loading state to render different state.
  Handling loading with usual state is doesn't work because of inner react-hook-form logic.

  Renders button component with setValue logic on click
  TODO Research
*/
const FormSubmit: React.FC<FormSubmitProps> = props => {
  const { children, ...buttonProps } = props
  const { setValue, watch, control } = useFormContext()
  const loading = watch && watch('loading')

  /* Component renders */
  const submitForm = e => {
    setValue &&
      setValue('loading', true, {
        shouldValidate: false,
        shouldDirty: true
      })

    buttonProps.onClick && buttonProps.onClick(e)
  }

  return (
    <Controller
      render={() => (
        <div className={styles.formSubmit}>
          <Button onClick={submitForm} loading={loading} submit {...buttonProps}>
            {children}
          </Button>
        </div>
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
