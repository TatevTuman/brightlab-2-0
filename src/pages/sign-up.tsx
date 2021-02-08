import React, { memo } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { FieldErrors } from 'react-hook-form'
import { useAlert } from 'react-alert'
import { Form, SEO } from '@components'
import { Input } from '@elements'
import { withFormControl } from '@hocs'
import { emailPattern, passwordValidation } from '@utils'
import { SignUpFormType } from '@types'

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
      <Form<SignUpFormType> onSubmit={handleSignUp} onError={handleSignUpError}>
        {useFormMethods => {
          return (
            <>
              <Form.Item>
                {/*<Input
                  name={'firstName'}
                  label={'First name'}
                  validation={{
                    required: { value: true, message: 'First name is required' }
                  }}
                />*/}
              </Form.Item>
              <Form.Item>
                {/*<Input
                  name={'lastName'}
                  label={'Last name'}
                  validation={{
                    required: { value: true, message: 'Last name is required' }
                  }}
                />*/}
              </Form.Item>
              <Form.Item>
                {/*<Input
                  type={'email'}
                  name={'email'}
                  label={'Email'}
                  validation={{
                    required: { value: true, message: 'Email is required' },
                    pattern: { value: emailPattern, message: 'It doesn`t seems to be an email' }
                  }}
                />*/}
              </Form.Item>
              <Form.Item>
                {/*<Input
                  type={'password'}
                  name={'password'}
                  label={'Password'}
                  validation={{
                    required: { value: true, message: 'Password is required' },
                    ...passwordValidation
                  }}
                />*/}
              </Form.Item>
              <Form.Submit>Sign up</Form.Submit>
            </>
          )
        }}
      </Form>
    </section>
  )
}

export default memo(SignUp)
