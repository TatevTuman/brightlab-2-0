import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProps } from './Form'
import FormModule from './Form.module'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

type TestForm = {
  Input: string
  Checkbox: boolean
}

const TestForm = FormModule<TestForm>()
const TestFormComponent = (props: Omit<FormProps<TestForm>, 'children'>) => {
  return (
    <TestForm {...props}>
      {() => {
        return (
          <>
            <TestForm.Item>
              <TestForm.Input
                name={'Input'}
                label={'Input'}
                validation={{ required: { value: true, message: 'Input error' } }}
              />
            </TestForm.Item>
            <TestForm.Item>
              <TestForm.Checkbox
                name={'Checkbox'}
                label={'Checkbox'}
                validation={{ required: { value: true, message: 'Checkbox error' } }}
              />
            </TestForm.Item>
            <TestForm.Submit>Submit</TestForm.Submit>
          </>
        )
      }}
    </TestForm>
  )
}

describe('Form Module', () => {
  const props = {
    onSubmit: jest.fn(),
    onError: jest.fn()
  }

  it('renders correctly', async () => {
    const { container } = await render(<TestFormComponent {...props} />)
    await waitFor(() => container)
    expect(container).toMatchSnapshot()
  })

  it('renders errors when values are invalid', async () => {
    const { container, getByRole, findAllByRole } = await render(<TestFormComponent {...props} />)
    await waitFor(() => container)

    const submit = getByRole('button')

    act(() => {
      userEvent.click(submit)
    })

    const errors = await findAllByRole('validation-error')

    expect(errors).toHaveLength(2)
    expect(props.onError).toBeCalled()
    expect(props.onSubmit).not.toBeCalled()
  })

  it('doesn`t render errors when values are valid', async () => {
    const { container, getByRole, getByLabelText, queryAllByRole } = await render(<TestFormComponent {...props} />)
    await waitFor(() => container)

    const primaryInput = getByLabelText('Input')
    const checkbox = getByLabelText('Checkbox')
    const submit = getByRole('button')

    act(() => {
      userEvent.type(primaryInput, 'test')
      userEvent.click(checkbox)
      userEvent.click(submit)
    })

    await waitFor(() => {
      const errors = queryAllByRole('validation-error')

      expect(errors).toHaveLength(0)
      expect(props.onError).not.toBeCalled()
      expect(props.onSubmit).toBeCalled()
    })
  })
})
