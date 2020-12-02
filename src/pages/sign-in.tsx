import React, { memo, useRef } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { FieldErrors } from 'react-hook-form'
import { useAlert } from 'react-alert'
import { Form, SEO } from '@components'
import { Input, Checkbox, Button } from '@elements'
import { SignInForm } from '@types'
import { emailPattern } from '@utils'

interface SignInProps extends RouteComponentProps {}

const SignIn: React.FC<SignInProps> = props => {
  const alert = useAlert()
  const navigate = useNavigate()
  const signInForm = useRef<HTMLFormElement>(null)

  const handleSignIn = async (form: SignInForm) => {
    console.log('form', form)

    if (signInForm && signInForm.current) {}

    alert.show('Hey! What`s up?', {
      type: 'success',
      onOpen: async () => await navigate('/'),
      onClose: () => {}
    })
  }

  const handleSignInError = (errors: FieldErrors<SignInForm>) => {
    console.log('errors', errors)

    alert.show(`Validation errors`, {
      type: 'error',
      onOpen: () => {},
      onClose: () => {}
    })
  }

  return (
    <section>
      <SEO title={'SignIn'} />
      <h1>SignIn</h1>
      <Form<SignInForm>
        ref={signInForm}
        defaultValues={{
          email: 'test@email.com',
          password: '123Gghj1',
          remember: true
        }}
        onSubmit={handleSignIn}
        onError={handleSignInError}
      >
        {useFormMethods => {
          return (
            <>
              <Form.Item>
                <Input
                  {...useFormMethods}
                  type={'email'}
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
                  {...useFormMethods}
                  type={'password'}
                  name={'password'}
                  label={'Password'}
                  validation={{
                    required: { value: true, message: 'Password is required' }
                  }}
                />
              </Form.Item>
              <Form.Item justify={'flex-end'}>
                <Checkbox
                  {...useFormMethods}
                  name={'remember'}
                  label={'Remember me'}
                  validation={{
                    required: { value: true, message: 'Required' }
                  }}
                />
              </Form.Item>
              <Button type={'primary'} size={'md'} submit centered>
                Войти
              </Button>
            </>
          )
        }}
      </Form>
    </section>
  )
}

export default memo(SignIn)
