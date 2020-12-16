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
      email: ''
    }
  }

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
              <Form.Submit>Submit</Form.Submit>
            </>
          )
        }}
      </Form>
    )

  it('renders correctly', async () => {
    const { container } = form()
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })

  it('submit on valid fields', async () => {
    const { getByText, getByLabelText } = form()

    await act(async () => {
      const email = await waitFor(() => getByLabelText('Email'))
      userEvent.type(email, 'test@test.com')
      const submit = await waitFor(() => getByText('Submit'))
      userEvent.click(submit)
    })

    expect(props.onError).toHaveBeenCalledTimes(0)
    expect(props.onSubmit).toHaveBeenCalledTimes(1)
  })
})
