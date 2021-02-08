import React, { RefObject } from 'react'
import { FieldValue, ControllerRenderProps } from 'react-hook-form'
import { Form, FormControlProps } from '@components'

export type WithFormControlProps<F> = {
  onChange?: (value: FieldValue<F>) => void
} & Omit<FormControlProps<F>, 'render'>

export type WithFormControlPropsPassed<F> = {
  value: FieldValue<F>
  innerRef?: RefObject<any>
  onChange: (value: FieldValue<F>) => void
}

/* Create generic Form component and use it's Control component to pass WithFormControlPropsPassed */
export default <F, P>(WrappedComponent: React.ComponentType<WithFormControlPropsPassed<F> & P>) => {
  const GenericForm = Form<F>()

  const WithFormControl: React.FC<WithFormControlProps<F> & Omit<P, 'value' | 'onChange'>> = props => {
    const { name, validation, onChange, ...parentProps } = props

    return (
      <GenericForm.Control
        name={name as never}
        validation={validation}
        render={(props: ControllerRenderProps) => {
          const { value, ref, onChange } = props

          /* TODO */
          const handleChange = (value: any) => {
            onChange(value)
            props.onChange(value)
          }

          return (
            <WrappedComponent
              value={value}
              innerRef={ref}
              onChange={handleChange}
              {...((parentProps as unknown) as P)}
            />
          )
        }}
      />
    )
  }

  WithFormControl.defaultProps = ({} as unknown) as WithFormControlProps<F> & P

  return WithFormControl
}
