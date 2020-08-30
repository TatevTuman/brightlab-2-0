import React, { memo } from 'react'
import { SEO } from '@components'
import { Form, Input, Button } from '@elements'
import { LayersProps } from '@layers'
import { SignUpForm } from '@types'
import { FieldErrors } from 'react-hook-form'
import { emailPattern, passwordValidation } from '@utils'

interface SignUpProps extends LayersProps {}

const SignUp: React.FC<SignUpProps> = props => {
  const { authMethods, navigate } = props

  const handleSignUp = async (form: SignUpForm) => {
    const token = await authMethods.handleSignUp(form)

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
          label={'firstName'}
          validation={{
            required: { value: true, message: 'firstName is required' }
          }}
        />
        <Input
          name={'lastName'}
          label={'lastName'}
          validation={{
            required: { value: true, message: 'firstName is required' }
          }}
        />
        <Input
          name={'email'}
          label={'Email'}
          validation={{
            required: { value: true, message: 'Email is required' },
            pattern: { value: emailPattern, message: 'It doesn`t seems to be an email' }
          }}
        />
        <Input
          name={'password'}
          label={'Password'}
          validation={{
            required: { value: true, message: 'Password is required' },
            ...passwordValidation
          }}
        />
        <Button type={'secondary'} size={'md'} submit>
          Войти
        </Button>
      </Form>
    </section>
  )
}

export default memo(SignUp)
