import React, { memo } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import cls from 'classnames'
import { ClassName } from '~types'

type HtmlFormProps = Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'className'
>
export interface FormProps extends HtmlFormProps {
  className?: ClassName
  form: UseFormReturn<any>
  onSubmit: (form: any) => void
  onError?: (errors: any) => void
}

const Form: React.FC<FormProps> = props => {
  const { className, form, children, onSubmit = () => null, onError = () => null, ...rest } = props

  return (
    <FormProvider {...form}>
      <form className={cls(className)} onSubmit={form.handleSubmit(onSubmit, onError)} noValidate {...rest}>
        {children}
      </form>
    </FormProvider>
  )
}

export default memo(Form)
