import React, { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Children } from '@types'
import './ValidationErrorMessage.scss'

export type ValidationErrorMessageType = { message: string }
export interface ValidationErrorMessageProps {
  name: string
  render?(error: ValidationErrorMessageType): Children
}

/*
  Validation error component for react-hook-form.
  Remember that you can use this component to render anything you want when field is not valid.
  You can render Modal if validation won't complete. If you want to use this component in a different way -
  create another component with different name. For example ValidationConfirmPassword component opens a modal window
  to ask an admin password to do a high risk operation in the app.
*/

/*
  Multiple Error Messages Examaple

  <ValidationErrorMessage
    errors={errors}
    name="multipleErrorInput"
    render={({ messages }) =>
      messages &&
      Object.entries(messages).map(([type, message]) => (
        <p key={type}>{message}</p>
      ))
    }
  />
*/

const ValidationErrorMessage: React.FC<ValidationErrorMessageProps> = props => {
  const { name, render } = props
  const formContext = useFormContext()

  if (!formContext) return null

  /* Gets error from errors object by name and passes it in render */
  const renderErrorMessage = (error: ValidationErrorMessageType) => {
    if (render) return render(error)
    else {
      return (
        <div className={'validation-error'} role="validation-error" data-testid="validation-error">
          {error.message}
        </div>
      )
    }
  }

  return <ErrorMessage errors={formContext.errors} name={name} render={renderErrorMessage} />
}

export default memo(ValidationErrorMessage)
