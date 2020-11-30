import { RegisterOptions, UseFormMethods } from 'react-hook-form'

export type ValidationProps = Partial<
  {
    validation: RegisterOptions
  } & UseFormMethods
>
