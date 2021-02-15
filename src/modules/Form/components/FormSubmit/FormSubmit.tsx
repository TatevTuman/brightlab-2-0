import React, { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button, ButtonProps } from '@elements'
import styles from '../../Form.module.scss'

export type FormSubmitProps = {} & Omit<ButtonProps, 'submit' | 'loading'>

/*
  Component controls form loading state to render different state.
  Handling loading with usual state doesn't work because of inner react-hook-form logic.

  Renders button component with setValue logic on click
*/
const FormSubmit: React.FC<FormSubmitProps> = props => {
  const { children, onClick, ...buttonProps } = props
  const { control } = useFormContext()

  return (
    <Controller
      render={props => {
        const { value, onChange } = props

        return (
          <Button
            {...buttonProps}
            className={styles.formSubmit}
            onClick={e => {
              onChange(true)

              if (onClick) {
                e.preventDefault()
                onClick(e)
              }
            }}
            loading={value}
            submit
          >
            {children}
          </Button>
        )
      }}
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
