import React, { memo } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { FieldErrors } from 'react-hook-form'
import { useAlert } from 'react-alert'
import { Form, SEO } from '@components'
import { emailPattern, passwordValidation } from '@utils'
import { SignUpFormType } from '@types'

const SignUpForm = Form<SignUpFormType>()

interface SignUpProps extends RouteComponentProps {}

const SignUp: React.FC<SignUpProps> = props => {
  const alert = useAlert()
  const navigate = useNavigate()

  const handleSignUp = async (form: SignUpFormType) => {
    console.log('form', form)

    alert.show('Welcome! Can you sign in?', {
      type: 'success',
      onOpen: async () => await navigate('/sign-in'),
      onClose: () => null
    })
  }

  const handleSignUpError = async (errors: FieldErrors<SignUpFormType>) => {
    console.log('errors', errors)

    alert.show(`Validation errors`, {
      type: 'error',
      onOpen: () => null,
      onClose: () => null
    })
  }

  return (
    <section>
      <SEO title={'SignUp'} />
      <h1>SignUp</h1>
      <SignUpForm onSubmit={handleSignUp} onError={handleSignUpError}>
        {useFormMethods => {
          return (
            <>
              <SignUpForm.Item>
                <SignUpForm.Input
                  name={'firstName'}
                  label={'First name'}
                  validation={{
                    required: { value: true, message: 'First name is required' }
                  }}
                />
              </SignUpForm.Item>
              <SignUpForm.Item>
                <SignUpForm.Input
                  name={'lastName'}
                  label={'Last name'}
                  validation={{
                    required: { value: true, message: 'Last name is required' }
                  }}
                />
              </SignUpForm.Item>
              <SignUpForm.Item>
                <SignUpForm.Input
                  type={'email'}
                  name={'email'}
                  label={'Email'}
                  validation={{
                    required: { value: true, message: 'Email is required' },
                    pattern: { value: emailPattern, message: 'It doesn`t seems to be an email' }
                  }}
                />
              </SignUpForm.Item>
              <SignUpForm.Item>
                <SignUpForm.Input
                  type={'password'}
                  name={'password'}
                  label={'Password'}
                  validation={{
                    required: { value: true, message: 'Password is required' },
                    ...passwordValidation
                  }}
                />
              </SignUpForm.Item>
              <SignUpForm.Submit>Sign up</SignUpForm.Submit>
            </>
          )
        }}
      </SignUpForm>
    </section>
  )
}

export default memo(SignUp)
