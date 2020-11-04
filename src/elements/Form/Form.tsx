import React, { memo, forwardRef, ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { UnpackNestedValue, FieldErrors } from 'react-hook-form/dist/types/form'
import './Form.scss'

interface FormProps {
  defaultValues?: Record<string, any>
  children: JSX.Element | JSX.Element[]
  onSubmit: (data: UnpackNestedValue<Record<string, any>>) => void
  onError?: (errors: FieldErrors<Record<string, any>>) => void
}

const Form: React.ForwardRefExoticComponent<FormProps> = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const { defaultValues, onSubmit, onError, children } = props
  const { register, handleSubmit, errors } = useForm({ defaultValues })

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit, onError)}>
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
})

export default memo(Form)
