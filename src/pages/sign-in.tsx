import React, { memo } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { FieldErrors } from 'react-hook-form'
import { useAlert } from 'react-alert'
import { Form, SEO } from '@components'
import { Input, Checkbox } from '@elements'
import { SignInForm } from '@types'
import { emailPattern } from '@utils'

interface SignInProps extends RouteComponentProps {}

const SignIn: React.FC<SignInProps> = props => {
  const alert = useAlert()
  const navigate = useNavigate()

  const handleSignIn = async (form: SignInForm) => {
    console.log('form', form)

    alert.show('Hey! What`s up?', {
      type: 'success',
      onOpen: async () => await navigate('/'),
      onClose: () => null
    })
  }

  const handleSignInError = (errors: FieldErrors<SignInForm>) => {
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
      <Form<SignInForm> onSubmit={handleSignIn} onError={handleSignInError}>
        {useFormMethods => {
          return (
            <>
              <Form.Item>
                <Input
                  type={'text'}
                  name={'email'}
                  label={'Email'}
                  validation={{
                    required: { value: true, message: 'Email is required' },
                    pattern: { value: emailPattern, message: 'It doesn`t seems to be an email' }
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type={'password'}
                  name={'password'}
                  label={'Password'}
                  validation={{
                    required: { value: true, message: 'Password is required' }
                  }}
                />
              </Form.Item>
              <Form.Item justify={'flex-end'}>
                <Checkbox name={'remember'} label={'Remember me'} />
              </Form.Item>
              <Form.Submit>Sign in</Form.Submit>
            </>
          )
        }}
      </Form>
    </section>
  )
}

export default memo(SignIn)
