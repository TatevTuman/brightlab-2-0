import { ValidationRules, UseFormMethods } from 'react-hook-form'

export type ValidationProps = Partial<
  {
    validation: ValidationRules
  } & UseFormMethods
>
