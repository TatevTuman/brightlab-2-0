import React from 'react'
import { useFormContext, Controller, ControllerRenderProps, RegisterOptions, FieldName } from 'react-hook-form'
import { ValidationErrorMessage } from '@elements'
import { genericMemo } from '@hocs'
import styles from '../../Form.module.scss'

export interface FormControlProps<F> {
  name: FieldName<F>
  validation?: RegisterOptions
  render: (props: ControllerRenderProps & { validation?: RegisterOptions }) => React.ReactElement
}

const FormControl = <F,>(props: FormControlProps<F>) => {
  const { name, validation, render } = props
  const { control } = useFormContext()

  return (
    <div className={styles.formControl}>
      <Controller
        render={props => render({ ...props, validation })}
        name={name as string}
        rules={validation}
        control={control}
      />
      <ValidationErrorMessage name={name as string} />
    </div>
  )
}

export default genericMemo(FormControl)
