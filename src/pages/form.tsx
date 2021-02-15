import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO, Form } from '@components'
import { FieldErrors } from 'react-hook-form'

interface TestFormType {
  input: string
  checkbox: boolean
  select: string
  autocomplete: string
}

const TestForm = Form<TestFormType>()

interface FormPageProps extends RouteComponentProps {}

const FormPage: React.FC<FormPageProps> = props => {
  const handleTestFormSubmit = (form: TestFormType) => {
    console.log('form', form)
  }

  const handleTestFormError = (errors: FieldErrors<TestFormType>) => {
    console.log('errors', errors)
  }

  const testOptions = new Array(100).fill(0).map((_, index) => ({ label: `${index}`, value: `${index}` }))

  return (
    <section>
      <SEO title={'FormPage'} />
      <h1>Form</h1>
      <div></div>
      <TestForm onSubmit={handleTestFormSubmit} onError={handleTestFormError}>
        {useFormMethods => {
          return (
            <>
              <TestForm.Item>
                <TestForm.Input
                  name={'input'}
                  label={'Input'}
                  validation={{ required: { value: true, message: 'Required' } }}
                />
              </TestForm.Item>
              <TestForm.Item>
                <TestForm.Checkbox
                  name={'checkbox'}
                  label={'Checkbox'}
                  validation={{ required: { value: true, message: 'Required' } }}
                />
              </TestForm.Item>
              <TestForm.Item>
                <TestForm.Select
                  name={'select'}
                  label={'Select'}
                  options={testOptions}
                  validation={{ required: { value: true, message: 'Required' } }}
                />
              </TestForm.Item>
              <TestForm.Item>
                <TestForm.Autocomplete
                  name={'autocomplete'}
                  label={'Autocomplete'}
                  options={testOptions}
                  validation={{ required: { value: true, message: 'Required' } }}
                />
              </TestForm.Item>
              <TestForm.Item>
                <TestForm.Submit>Submit</TestForm.Submit>
              </TestForm.Item>
            </>
          )
        }}
      </TestForm>
    </section>
  )
}

export default memo(FormPage)
