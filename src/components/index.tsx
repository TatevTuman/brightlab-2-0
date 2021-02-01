import loadable from '@loadable/component'

export const Page = loadable(() => import('./Page/Page'))
export const Container = loadable(() => import('./Container/Container'))
export const Header = loadable(() => import('./Header/Header'))
export const Footer = loadable(() => import('./Footer/Footer'))
export const List = loadable(() => import('./List/List'))
export const Calendar = loadable(() => import('./Calendar/Calendar'))

export const SEO = loadable(() => import('./SEO'))
export const ErrorBoundary = loadable(() => import('./ErrorBoundary/ErrorBoundary'))

export const Modals = loadable(() => import('./Modals/Modals'))

export { default as Select } from './Select/Select'
export { default as Autocomplete } from './Autocomplete/Autocomplete'
export { default as Modal } from './Modal/Modal'

export const Form = loadable(() => import('./Form/Form'))

export type { SelectState, SelectProps } from './Select/Select'
export type { ListPropsColumnsType } from './List/List'
