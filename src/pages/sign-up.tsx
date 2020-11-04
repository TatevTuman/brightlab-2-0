import React, { memo, useRef } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'
import { Form, Input, Button } from '@elements'
import { SignUpForm } from '@types'
import { FieldErrors } from 'react-hook-form'
import { emailPattern, passwordValidation } from '@utils'

interface SignUpProps extends RouteComponentProps {}

const SignUp: React.FC<SignUpProps> = props => {
  const signUpForm = useRef<HTMLFormElement>()

  const handleSignUp = async (form: SignUpForm) => {
    console.log('form', form)

    if (signUpForm && signUpForm.current) {
      const { firstName } = signUpForm.current
      console.log('firstName', firstName.value)
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
      <Form ref={signUpForm} onSubmit={handleSignUp} onError={handleSignUpError}>
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
