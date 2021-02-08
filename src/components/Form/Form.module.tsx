import { LoadableComponent } from '@loadable/component'
import { withLoadableFallback, WithLoadableFallbackOptions } from '@hocs'
import { FormControl, FormItem, FormSubmit } from './components'

import type { FormProps } from '@components'
import type { FormModule } from './Form'
type LoadableForm<F> = LoadableComponent<FormProps<F>> & FormModule

/*
  Form module
  TODO Research. Dot notation doesn't work with hocs

  Callback needs for generic form logic
  const SignInForm = Form<SignInFormType>()
*/

const Form = <F,>(withLoadableFallbackOptions?: WithLoadableFallbackOptions): LoadableForm<F> => {
  const FormModule = withLoadableFallback<FormProps<F>>(
    import('./Form'),
    withLoadableFallbackOptions || {}
  ) as LoadableForm<F>

  /* Adding component for module */
  FormModule.Control = FormControl
  FormModule.Item = FormItem
  FormModule.Submit = FormSubmit

  return FormModule
}

export default Form
