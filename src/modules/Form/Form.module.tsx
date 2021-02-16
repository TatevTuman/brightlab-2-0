import React from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { LoadableComponent } from '@loadable/component'
import { withLoadableFallback, WithLoadableFallbackOptions } from '@hocs'
import { Autocomplete, AutocompleteProps, Select, SelectProps } from '@components'
import { Input, InputProps, Checkbox, CheckboxProps } from '@elements'
import type { FormProps, FormControlProps } from '@modules'

import { FormControl, FormItem, FormSubmit } from './components'

/* We don't need to pass these props to form component anymore because form controls them */
export type FormModuleComponentControlledFields = 'name' | 'value' | 'checked' | 'onChange' | 'required'
/* We don't need to pass these props to form control anymore because we described it usages here */
export type FormModuleControlledFields = 'render' | 'defaultValue'

/* Groups from component props with form control props excluding props form controls */
export type FormModuleComponent<T, F> = React.FC<
  Omit<T, FormModuleComponentControlledFields> & Omit<FormControlProps<F>, FormModuleControlledFields>
>
/* Form module. Controlled components */
export type FormModule<F> = {
  Item: typeof FormItem
  Control: typeof FormControl
  Submit: typeof FormSubmit
  Input: FormModuleComponent<InputProps, F>
  Select: FormModuleComponent<SelectProps, F>
  Autocomplete: FormModuleComponent<AutocompleteProps, F>
  Checkbox: FormModuleComponent<CheckboxProps, F>
}
/* Form we get from loadable */
export type LoadableForm<F> = LoadableComponent<FormProps<F>> & FormModule<F>

/*
  Form module
  TODO Research. Dot notation doesn't work with hocs

  Callback needs for generic form logic
  const SignInForm = Form<SignInFormType>()
*/

const Form = <F,>(withLoadableFallbackOptions?: WithLoadableFallbackOptions): LoadableForm<F> => {
  const FormModule = withLoadableFallback<FormProps<F>>(
    import('./Form'),
    withLoadableFallbackOptions || {}
  ) as LoadableForm<F>

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
        render={(props: ControllerRenderProps) => {
          const { value, ref, onChange } = props

          return <Input name={name} value={value} ref={ref} onChange={onChange} required={required} {...inputProps} />
        }}
      />
    )
  }

  FormModule.Input.displayName = 'FormInput'

  FormModule.Select = props => {
    const { name, validation, defaultValue, ...selectProps } = props
    const required = !!validation?.required

    return (
      <FormModule.Control
        name={name}
        validation={validation}
        defaultValue={defaultValue || null}
        render={(props: ControllerRenderProps) => {
          const { value, ref, onChange } = props

          return (
            <Select name={name} value={value} innerRef={ref} onChange={onChange} required={required} {...selectProps} />
          )
        }}
      />
    )
  }

  FormModule.Select.displayName = 'FormSelect'

  FormModule.Autocomplete = props => {
    const { name, validation, defaultValue, ...autocompleteProps } = props
    const required = !!validation?.required

    return (
      <FormModule.Control
        name={name}
        validation={validation}
        defaultValue={defaultValue || null}
        render={(props: ControllerRenderProps) => {
          const { value, ref, onChange } = props

          return (
            <Autocomplete
              name={name}
              value={value}
              innerRef={ref}
              onChange={onChange}
              required={required}
              {...autocompleteProps}
            />
          )
        }}
      />
    )
  }

  FormModule.Autocomplete.displayName = 'FormAutocomplete'

  FormModule.Checkbox = props => {
    const { name, validation, defaultChecked, ...checkboxProps } = props
    const required = !!validation?.required

    return (
      <FormModule.Control
        name={name}
        validation={validation}
        defaultValue={defaultChecked || false}
        render={(props: ControllerRenderProps) => {
          const { value, ref, onChange } = props

          return (
            <Checkbox
              name={name}
              checked={value}
              ref={ref}
              onChange={onChange}
              required={required}
              {...checkboxProps}
            />
          )
        }}
      />
    )
  }

  FormModule.Checkbox.displayName = 'FormCheckbox'

  return FormModule
}

export default Form
