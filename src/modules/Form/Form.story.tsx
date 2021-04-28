import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { storybook } from '@utils'
import FormModule from './Form.module'
import { FormProps } from './Form'

type TestForm = {
  input: string
  select: string
  autocomplete: string
  checkbox: boolean
}

const Form = FormModule<TestForm>()
const selectOptions = new Array(100).fill(0).map((_, index) => {
  return { label: 'Select Option' + index, value: index.toString() }
})
const autocompleteOptions = new Array(100).fill(0).map((_, index) => {
  return { label: 'Autocomplete Option' + index, value: index.toString() }
})

interface FormStoryTemplateProps extends FormProps<TestForm> {}

export default {
  title: 'Components/Form',
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onError: { action: 'onError' }
  }
} as Meta

const FormStoryTemplate: Story<FormStoryTemplateProps> = args => {
  return (
    <Form {...args}>
      {useFormMethods => {
        const { getValues } = useFormMethods

        return (
          <>
            <Form.Item>
              <Form.Input label={'Input'} name={'input'} />
            </Form.Item>
            {/*<Form.Item>*/}
            {/*  <Form.Select name={'select'} options={selectOptions} />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item>*/}
            {/*  <Form.Autocomplete name={'autocomplete'} options={autocompleteOptions} />*/}
            {/*</Form.Item>*/}
            <Form.Item>
              <Form.Checkbox label={'Checkbox'} name={'checkbox'} />
            </Form.Item>
            <Form.Submit type={'primary'}>Submit</Form.Submit>
            <Form.Item>{JSON.stringify(getValues(), null, 2)}</Form.Item>
          </>
        )
      }}
    </Form>
  )
}

FormStoryTemplate.args = {
  onSubmit: action('onSubmit'),
  onError: action('onError')
}

export const FormStory = FormStoryTemplate.bind({})
FormStory.args = {
  ...FormStoryTemplate.args
}
