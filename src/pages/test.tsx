import React, { memo } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { FieldErrors } from 'react-hook-form'
import { useAlert } from 'react-alert'
import { SEO } from '@components'
import { Form } from '@modules'
import { SignInFormType } from '@types'
import { emailPattern } from '@utils'

const SignInForm = Form<SignInFormType>({ fallback: { height: '100rem' } })

interface SignInProps extends RouteComponentProps {}

const SignIn: React.FC<SignInProps> = props => {
  const alert = useAlert()
  const navigate = useNavigate()

  const handleSignIn = async (form: SignInFormType) => {
    console.log('form', form)

    alert.show('Hey! What`s up?', {
      type: 'success',
      onOpen: async () => await navigate('/'),
      onClose: () => null
    })
  }

  const handleSignInError = (errors: FieldErrors<SignInFormType>) => {
    console.log('errors', errors)

    alert.show(`Validation errors`, {
      type: 'error',
      onOpen: () => null,
      onClose: () => null
    })
  }

  return (
    <section>
      <SEO title={'SignIn'} />
      <h1>SignIn</h1>
      <SignInForm onSubmit={handleSignIn} onError={handleSignInError}>
        {useFormMethods => {
          return (
            <>
              <SignInForm.Item>
                <SignInForm.Input
                  name={'email'}
                  label={'Email'}
                  validation={{
                    required: { value: true, message: 'Email is required' },
                    pattern: { value: emailPattern, message: 'It doesn`t seems to be an email' }
                  }}
                />
              </SignInForm.Item>
              <SignInForm.Item>
                <SignInForm.Input
                  type={'password'}
                  name={'password'}
                  label={'Password'}
                  validation={{
                    required: { value: true, message: 'Password is required' }
                  }}
                />
              </SignInForm.Item>
              <SignInForm.Item justify={'flex-end'}>
                <SignInForm.Checkbox name={'remember'} label={'Remember me'} />
              </SignInForm.Item>
              <SignInForm.Submit>Sign in</SignInForm.Submit>
            </>
          )
        }}
      </SignInForm>
    </section>
  )
}

export default memo(SignIn)
