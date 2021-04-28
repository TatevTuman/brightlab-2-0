import React from 'react'
import { useFormContext, Controller, ControllerRenderProps, RegisterOptions, FieldName } from 'react-hook-form'
import { ValidationErrorMessage } from '@elements'
import { genericMemo } from '@hocs'
import '../Form.scss'

export interface FormControlProps<F> {
  name: FieldName<F>
  validation?: RegisterOptions
  defaultValue?: string | boolean | Date | null
  render: (props: ControllerRenderProps & { validation?: RegisterOptions; error: boolean }) => React.ReactElement
  noError?: boolean
  noWidth?: boolean
  className?: string
}

const FormControl = <F,>(props: FormControlProps<F>) => {
  const { name, validation, defaultValue, render, noError, noWidth, className } = props
  const { control, errors } = useFormContext()
  const error = Boolean(errors[name])

  return (
    <div className={'form-control ' + className} data-no-width={noWidth}>
      <Controller
        name={name}
        render={props => render({ ...props, validation, error })}
        rules={validation}
        defaultValue={defaultValue}
        control={control}
      />
      {!noError && <ValidationErrorMessage name={name} />}
    </div>
  )
}

export default genericMemo(FormControl)
