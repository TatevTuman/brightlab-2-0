import React from 'react'
import { FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { AnyObject, Children } from '@types'
import styles from './ValidationErrorMessage.module.scss'

/*
  ValidationErrorMessage component should have FormProvider as a DOM parent to get context -
  so all tests where ValidationErrorMessage is used will throw an error 'Can't read property errors of null'.
  This why i mocked this component in __mocks__.

  Use jest.mock('./ValidationErrorMessage.tsx') every time when ValidationErrorMessage is used in test component
*/

export type ValidationErrorMessageType = { message: string }
export interface ValidationErrorMessageProps {
  errors?: FieldErrors<AnyObject>
  name: string
  render?(error: ValidationErrorMessageType, className: string): Children
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
  const { errors, name, render } = props

  /* Gets error from errors object by name and passes it in render */
  const renderErrorMessage = (error: ValidationErrorMessageType) => {
    if (render) return render(error, styles.validationError)
    else {
      return (
        <div role="validation-error" className={styles.validationError}>
          {error.message}
        </div>
      )
    }
  }

  return <ErrorMessage errors={errors} name={name} render={renderErrorMessage} />
}

export default ValidationErrorMessage
