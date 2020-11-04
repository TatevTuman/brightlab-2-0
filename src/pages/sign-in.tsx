import React, { memo, useRef } from 'react'
import { RouteComponentProps } from '@reach/router'
import { FieldErrors } from 'react-hook-form'
import { SEO } from '@components'
import { Form, Input, Button } from '@elements'
import { SignInForm } from '@types'
import { emailPattern } from '@utils'

interface SignInProps extends RouteComponentProps {}

const SignIn: React.FC<SignInProps> = props => {
  const signInForm = useRef<HTMLFormElement>()

  const handleSignIn = async (form: SignInForm) => {
    console.log('form', form)

    if (signInForm && signInForm.current) {
      const { email } = signInForm.current
      console.log('email', email.value)
    }
  }

  const handleSignInError = (errors: FieldErrors<SignInForm>) => {
    console.log('errors', errors)
  }

  return (
    <section>
      <SEO title={'SignIn'} />
      <h1>SignIn</h1>
      {/* @ts-ignore TODO loadable component don't see generic type */}
      <Form onSubmit={handleSignIn} onError={handleSignInError}>
        <Input
          type={'email'}
          name={'email'}
          label={'Email'}
          validation={{
            required: { value: true, message: 'Email is required' },
            pattern: { value: emailPattern, message: 'It doesn`t seems to be an email' }
          }}
        />
        <Input
          type={'password'}
          name={'password'}
          label={'Password'}
          validation={{
            required: { value: true, message: 'Password is required' }
          }}
        />
        <Button type={'secondary'} size={'md'} submit centered>
          Войти
        </Button>
      </Form>
    </section>
  )
}

export default memo(SignIn)
