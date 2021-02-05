import React, { memo } from 'react'
import { Controller, ControllerRenderProps, RegisterOptions, useFormContext } from 'react-hook-form'
import { ValidationErrorMessage } from '@elements'
import styles from '../../Form.module.scss'

export interface FormControlProps {
  name: string
  validation?: RegisterOptions
  render: (props: ControllerRenderProps & { validation?: RegisterOptions }) => React.ReactElement
}

const FormControl: React.FC<FormControlProps> = props => {
  const { name, validation, render } = props
  const { control } = useFormContext()

  return (
    <div className={styles.formControl}>
      <Controller render={props => render({ ...props, validation })} name={name} rules={validation} control={control} />
      <ValidationErrorMessage name={name} />
    </div>
  )
}

export default memo(FormControl)
