import { withLoadableFallback } from '@hocs'

import type { PageProps } from './Page/Page'
import type { ContainerProps } from './Container/Container'
import type { HeaderProps } from './Header/Header'
import type { FooterProps } from './Footer/Footer'
import type { CalendarProps } from './Calendar/Calendar'
import type { SEOProps } from './SEO'
import type { ListProps, ListPropsColumnsType } from './List/List'
import type { FormProps } from './Form/Form'
import type { FormItemProps, FormSubmitProps, FormControlProps } from './Form/components'
import type { SelectProps } from './Select/Select'
import type { AutocompleteProps } from './Autocomplete/Autocomplete'
import type { ModalProps } from './Modal/Modal'
import type { ModalHeaderProps, ModalFooterProps } from './Modal/components'

const Page = withLoadableFallback<PageProps>(import('./Page/Page'), {
  fallback: { height: '100vh' }
})
const Container = withLoadableFallback<ContainerProps>(import('./Container/Container'), {
  fallback: { height: '10rem' }
})
const Header = withLoadableFallback<HeaderProps>(import('./Header/Header'), {
  fallback: { height: '10rem' }
})
const Footer = withLoadableFallback<FooterProps>(import('./Footer/Footer'), {
  fallback: { height: '10rem' }
})
const Calendar = withLoadableFallback<CalendarProps>(import('./Calendar/Calendar'), {
  fallback: { height: '10rem' }
})
const SEO = withLoadableFallback<SEOProps>(import('./SEO'), {
  fallback: { height: '10rem' }
})
const List = withLoadableFallback<ListProps>(import('./List/List'), {
  fallback: { height: '10rem' }
})
const Select = withLoadableFallback<SelectProps>(import('./Select/Select'), {
  fallback: { height: '10rem' }
})
const Autocomplete = withLoadableFallback<AutocompleteProps>(import('./Autocomplete/Autocomplete'), {
  fallback: { height: '10rem' }
})
const Modals = withLoadableFallback(import('./Modals/Modals'), {
  fallback: { height: '10rem' }
})

export { default as Form } from './Form/Form.module'
import type {
  LoadableForm,
  FormModule,
  FormModuleComponent,
  FormModuleComponentControlledFields
} from './Form/Form.module'

export { default as Modal } from './Modal/Modal.module'
import type { LoadableModal } from './Modal/Modal.module'

export { Page, Container, Header, Footer, Calendar, SEO, List, Select, Autocomplete, Modals }

export type {
  PageProps,
  ContainerProps,
  HeaderProps,
  FooterProps,
  CalendarProps,
  SEOProps,
  ListPropsColumnsType,
  FormProps,
  FormItemProps,
  FormSubmitProps,
  FormControlProps,
  SelectProps,
  AutocompleteProps,
  ModalProps,
  ModalHeaderProps,
  ModalFooterProps,
  LoadableForm,
  LoadableModal
}
