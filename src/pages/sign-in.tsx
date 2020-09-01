import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'
import { Form, Input, Button } from '@elements'
import { useAuthLayer } from '@hooks'
import { SignInForm } from '@types'
import { FieldErrors } from 'react-hook-form'
import { emailPattern } from '@utils'

interface SignInProps extends RouteComponentProps {}

const SignIn: React.FC<SignInProps> = props => {
  const { navigate } = props

  const { authMethods } = useAuthLayer()

  const handleSignIn = async (form: SignInForm) => {
    const token = await authMethods.handleSignIn(form)

    if (token) {
      navigate && navigate('/admin/users')
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
      <Form<SignInForm> onSubmit={handleSignIn} onError={handleSignInError}>
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
