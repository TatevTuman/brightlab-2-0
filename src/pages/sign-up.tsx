import React, { memo, useRef } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { FieldErrors } from 'react-hook-form'
import { useAlert } from 'react-alert'
import { Autocomplete, Form, Select, SEO } from '@components'
import { Input } from '@elements'
import { JobOptionValue, RoleOptionValue, SignUpForm } from '@types'
import { emailPattern, passwordValidation } from '@utils'

interface SignUpProps extends RouteComponentProps {}

const SignUp: React.FC<SignUpProps> = props => {
  const alert = useAlert()
  const navigate = useNavigate()
  const signUpForm = useRef<HTMLFormElement>(null)

  const handleSignUp = async (form: SignUpForm) => {
    console.log('form', form)
    if (signUpForm && signUpForm.current) {
    }

    alert.show('Welcome! Can you sign in?', {
      type: 'success',
      onOpen: async () => await navigate('/sign-in'),
      onClose: () => {}
    })
  }

  const handleSignUpError = async (errors: FieldErrors<SignUpForm>) => {
    console.log('errors', errors)
    if (signUpForm && signUpForm.current) {
    }

    alert.show(`Validation errors`, {
      type: 'error',
      onOpen: () => {},
      onClose: () => {}
    })
  }

  const roleOptions = [
    { label: 'User', value: { name: 'user' } },
    { label: 'Admin', value: { name: 'admin' } },
    { label: 'Guest', value: { name: 'guest' } },
    { label: 'Manager', value: { name: 'manager' } },
    { label: 'Devops', value: { name: 'devops' } },
    { label: 'Client', value: { name: 'client' } }
  ]

  const jobOptions = [
    { label: 'Developer', value: { name: 'developer' } },
    { label: 'Project Manager', value: { name: 'manager' } },
    { label: 'Data-Science engineer', value: { name: 'engineer' } }
  ]

  return (
    <section>
      <SEO title={'SignUp'} />
      <h1>SignUp</h1>
      <Form<SignUpForm> ref={signUpForm} onSubmit={handleSignUp} onError={handleSignUpError}>
        {useFormMethods => {
          return (
            <>
              <Form.Item>
                <Input
                  {...useFormMethods}
                  name={'firstName'}
                  label={'First name'}
                  validation={{
                    required: { value: true, message: 'First name is required' }
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  {...useFormMethods}
                  name={'lastName'}
                  label={'Last name'}
                  validation={{
                    required: { value: true, message: 'Last name is required' }
                  }}
                />
              </Form.Item>
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
                    required: { value: true, message: 'Password is required' },
                    ...passwordValidation
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Autocomplete<RoleOptionValue>
                  options={roleOptions}
                  name={'role'}
                  label={'Select your profile role'}
                  useFormMethods={{
                    ...useFormMethods,
                    validation: {
                      required: { value: true, message: 'Role is required' }
                    }
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Select<JobOptionValue>
                  options={jobOptions}
                  name={'job'}
                  label={'What about your job?'}
                  useFormMethods={{
                    ...useFormMethods,
                    validation: {
                      required: { value: true, message: 'Job is required' }
                    }
                  }}
                />
              </Form.Item>
              <Form.Submit useFormMethods={useFormMethods}>Sign up</Form.Submit>
            </>
          )
        }}
      </Form>
    </section>
  )
}

export default memo(SignUp)
