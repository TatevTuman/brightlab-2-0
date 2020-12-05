import React from 'react'
import { render, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, Input } from '@elements'
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
    onError: jest.fn()
  }

  const form = () =>
    render(
      <Form<{ email: string }> {...props}>
        {useFormMethods => {
          return (
            <>
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
              <Button type={'secondary'} size={'md'} submit centered>
                Submit
              </Button>
            </>
          )
        }}
      </Form>
    )

  it('renders correctly', async () => {
    const { container } = form()
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
  })

  it('submit on invalid fields', async () => {
    const { getByText, getByLabelText } = form()

    await act(async () => {
      const email = await waitFor(() => getByLabelText('Email'))
      userEvent.type(email, 'invalid email')
      const submit = await waitFor(() => getByText('Submit'))
      userEvent.click(submit)
    })

    expect(props.onSubmit).toHaveBeenCalledTimes(0)
  })

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
