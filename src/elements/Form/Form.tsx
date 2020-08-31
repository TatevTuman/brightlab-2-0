import React, { memo, ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { UnpackNestedValue, FieldErrors } from 'react-hook-form/dist/types/form'
import './Form.scss'

interface FormProps<T> {
  defaultValues?: Record<string, any>
  children: JSX.Element | JSX.Element[]
  onSubmit: (data: UnpackNestedValue<T>) => void
  onError?: (errors: FieldErrors<T>) => void
}

function Form<T>(props: FormProps<T>): ReactElement<FormProps<T>> {
  const { defaultValues, onSubmit, onError, children } = props
  const { register, handleSubmit, errors } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {React.Children.map(children, (child: ReactElement) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: register(child.props.validation),
                error: errors[child.props.name],
                key: child.props.name
              }
            })
          : child
      })}
    </form>
  )
}

export default memo(Form)
