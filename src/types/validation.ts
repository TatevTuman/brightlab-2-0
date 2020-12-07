import { RegisterOptions, UseFormMethods } from 'react-hook-form'

export type ReactHookFormProps = Partial<
  {
    validation: RegisterOptions
  } & UseFormMethods
>
