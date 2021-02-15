import React from 'react'
import { useFormContext, Controller, ControllerRenderProps, RegisterOptions, FieldName } from 'react-hook-form'
import { ValidationErrorMessage } from '@elements'
import { genericMemo } from '@hocs'
import styles from '../../Form.module.scss'

export interface FormControlProps<F> {
  name: FieldName<F>
  validation?: RegisterOptions
  defaultValue: string | boolean | null
  render: (props: ControllerRenderProps & { validation?: RegisterOptions }) => React.ReactElement
}

const FormControl = <F,>(props: FormControlProps<F>) => {
  const { name, validation, defaultValue, render } = props
  const { control } = useFormContext()

  return (
    <div className={styles.formControl}>
      <Controller
        render={props => render({ ...props, validation })}
        name={name}
        rules={validation}
        defaultValue={defaultValue}
        control={control}
      />
      <ValidationErrorMessage name={name} />
    </div>
  )
}

export default genericMemo(FormControl)
