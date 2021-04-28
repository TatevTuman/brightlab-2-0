import React from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import loadable, { LoadableComponent } from '@loadable/component'
import {} from '@components'
import { Input, InputProps, Checkbox, CheckboxProps } from '@elements'

import type { FormProps, FormControlProps } from '@modules'

import { FormControl, FormItem, FormSubmit } from './components'

/* We don't need to pass these props to form component anymore because form controls them */
export type FormModuleComponentControlledFields = 'name' | 'value' | 'checked' | 'onChange' | 'required' | 'ref'
/* We don't need to pass these props to form control anymore because we described it usages here */
export type FormModuleControlledFields = 'render' | 'defaultValue'

/* Groups from component props with form control props excluding props form controls */
export type FormModuleComponent<T, F> = React.FC<
  Omit<T, FormModuleComponentControlledFields> & Omit<FormControlProps<F>, FormModuleControlledFields>
>
/* Form module. Controlled components */
export type FormModule<F> = {
  Item: typeof FormItem
  Control: React.FC<FormControlProps<F>>
  Submit: typeof FormSubmit
  Input: FormModuleComponent<InputProps, F>
  Checkbox: FormModuleComponent<CheckboxProps, F>
}
/* Form we get from loadable */
export type LoadableForm<F> = LoadableComponent<FormProps<F>> & FormModule<F>

/*
  Form module

  Callback needs for generic form logic
  const SignInForm = Form<SignInFormType>()
*/

const Form = <F,>() => {
  const FormModule = loadable(() => import('./Form')) as LoadableForm<F>

  /* Adding components to the module */
  FormModule.Control = FormControl
  FormModule.Item = FormItem
  FormModule.Submit = FormSubmit

  FormModule.Input = props => {
    const { name, validation, defaultValue, ...inputProps } = props
    const required = !!validation?.required

    return (
      <FormModule.Control
        name={name}
        validation={validation}
        defaultValue={defaultValue || ''}
        render={(props: ControllerRenderProps & { error: boolean }) => {
          const { value, ref, onChange, error } = props

          return (
            <Input
              name={name}
              value={value}
              ref={ref}
              onChange={onChange}
              onClear={() => onChange('')}
              required={required}
              error={error}
              {...inputProps}
            />
          )
        }}
      />
    )
  }

  FormModule.Input.displayName = 'FormInput'

  FormModule.Checkbox = props => {
    const { name, validation, defaultChecked, ...checkboxProps } = props
    const required = !!validation?.required

    return (
      <FormModule.Control
        name={name}
        validation={validation}
        defaultValue={defaultChecked || false}
        render={(props: ControllerRenderProps & { error?: boolean }) => {
          const { value, ref, error, onChange } = props

          return (
            <Checkbox
              name={name}
              checked={value}
              ref={ref}
              onChange={onChange}
              required={required}
              error={error}
              {...checkboxProps}
            />
          )
        }}
      />
    )
  }

  FormModule.Checkbox.displayName = 'FormCheckbox'

  return FormModule as React.FC<FormProps<F>> & FormModule<F>
}

export default Form
