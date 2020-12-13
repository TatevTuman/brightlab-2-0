import React from 'react'
import { render, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Autocomplete, Select } from '@components'
import { Button, Input } from '@elements'
import { RoleOptionValue } from '@types'
import { emailPattern } from '@utils'
import Form from './Form'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Form', () => {
  const props = {
    onSubmit: jest.fn(),
    onError: jest.fn(),
    defaultValues: {
      email: '',
      // role: undefined,
      // job: undefined
    }
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

  const form = () =>
    render(
      <Form<{ email: string; role: { name: string }; job: { name: string } }> {...props}>
        {useFormMethods => {
          return (
            <>
              <Input
                type={'email'}
                name={'email'}
                label={'Email'}
                validation={{
                  required: { value: true, message: 'Email is required' },
                  pattern: { value: emailPattern, message: 'It doesn`t seems to be an email' }
                }}
              />
              {/*<Autocomplete<RoleOptionValue>*/}
              {/*  options={roleOptions}*/}
              {/*  name={'role'}*/}
              {/*  label={'Select your role'}*/}
              {/*  useFormMethods={{*/}
              {/*    ...useFormMethods,*/}
              {/*    validation: {*/}
              {/*      required: { value: true, message: 'Role is required' }*/}
              {/*    }*/}
              {/*  }}*/}
              {/*/>*/}
              {/*<Select<RoleOptionValue>*/}
              {/*  options={jobOptions}*/}
              {/*  name={'job'}*/}
              {/*  label={'Select your job'}*/}
              {/*  useFormMethods={{*/}
              {/*    ...useFormMethods,*/}
              {/*    validation: {*/}
              {/*      required: { value: true, message: 'Job is required' }*/}
              {/*    }*/}
              {/*  }}*/}
              {/*/>*/}
              <Button type={'secondary'} size={'md'} submit centered>
                Submit
              </Button>
            </>
          )
        }}
      </Form>
    )

  const requiredErrors = ['Email is required', 'Role is required', 'Job is required']

  it('renders correctly', async () => {
    const { container } = form()
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })

  // TODO useFormContext
  // it('submit on invalid fields', async () => {
  //   const { getByText } = form()
  //
  //   await act(async () => {
  //     const submit = await waitFor(() => getByText('Submit'))
  //     userEvent.click(submit)
  //   })
  //
  //   // requiredErrors.forEach(error => expect(getByText(error)).toBeInTheDocument())
  //
  //   expect(props.onSubmit).toHaveBeenCalledTimes(0)
  // })

  it('submit on valid fields', async () => {
    const { getByText, getByLabelText } = form()

    await act(async () => {
      const email = await waitFor(() => getByLabelText('Email'))
      userEvent.type(email, 'test@test.com')
      const submit = await waitFor(() => getByText('Submit'))
      userEvent.click(submit)
    })

    expect(props.onSubmit).toHaveBeenCalledTimes(1)
  })

  // TODO with different types of elements
})
