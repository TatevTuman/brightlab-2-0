import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'
import { Form, Input, Button } from '@elements'
import { useUsersLayer } from '@layers'
import { SignUpForm } from '@types'
import { FieldErrors } from 'react-hook-form'
import { emailPattern, passwordValidation } from '@utils'

interface SignUpProps extends RouteComponentProps {}

const SignUp: React.FC<SignUpProps> = props => {
  const { navigate } = props

  const { usersApi } = useUsersLayer()

  const handleSignUp = async (form: SignUpForm) => {
    const token = await usersApi.handleSignUp(form)

    if (token) {
      navigate && navigate('/sign-in')
    }
  }

  const handleSignUpError = (errors: FieldErrors<SignUpForm>) => {
    console.log('errors', errors)
  }

  return (
    <section>
      <SEO title={'SignUp'} />
      <h1>SignUp</h1>
      {/* @ts-ignore TODO loadable component don't see generic type */}
      <Form<SignUpForm> onSubmit={handleSignUp} onError={handleSignUpError}>
        <Input
          name={'firstName'}
          label={'First name'}
          validation={{
            required: { value: true, message: 'First name is required' }
          }}
        />
        <Input
          name={'lastName'}
          label={'Last name'}
          validation={{
            required: { value: true, message: 'Last name is required' }
          }}
        />
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
            required: { value: true, message: 'Password is required' },
            ...passwordValidation
          }}
        />
        <Button type={'secondary'} size={'md'} submit centered>
          Войти
        </Button>
      </Form>
    </section>
  )
}

export default memo(SignUp)
