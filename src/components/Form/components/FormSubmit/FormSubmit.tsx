import React, { memo } from 'react'
import { Controller } from 'react-hook-form'
import { Button, ButtonProps } from '@elements'
import { ReactHookFormProps } from '@types'
import styles from '../../Form.module.scss'

export type FormSubmitProps = {
  useFormMethods: Omit<ReactHookFormProps, 'validation'>
} & Omit<ButtonProps, 'submit'>

/*
  Component controls form loading state to render different state.
  Handling loading with usual state is doesn't work because of inner react-hook-form logic.

  Renders button component with setValue logic on click
  TODO Research
*/
const FormSubmit: React.FC<FormSubmitProps> = props => {
  const { useFormMethods, children, ...buttonProps } = props
  const { setValue, watch, control } = useFormMethods
  const loading = watch && watch('loading')

  /* Component renders */
  const setFormLoading = () => {
    setValue &&
      setValue('loading', true, {
        shouldValidate: false,
        shouldDirty: true
      })
  }

  return (
    <Controller
      render={() => (
        <div className={styles.formSubmit}>
          <Button onClick={setFormLoading} loading={loading} submit {...buttonProps}>
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
