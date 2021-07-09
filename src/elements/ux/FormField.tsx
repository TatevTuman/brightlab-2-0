import React, { memo } from 'react'
import { Children, ClassName } from '~types'
import { useFormContext } from 'react-hook-form'
import { LabelField } from '~ux'

export interface FormFieldProps {
  className?: ClassName
  name?: string
  label?: Children
  children: (error: string) => Children
}

const FormField: React.FC<FormFieldProps> = props => {
  const { name, label, children, ...rest } = props

  const {
    formState: { errors }
  } = useFormContext()

  const error = name && errors[name] && errors[name].message

  return (
    <LabelField name={name} label={label} {...rest}>
      {typeof children === 'function' ? (children as (error: string) => Children)(error) : children}
    </LabelField>
  )
}

export default memo(FormField)
