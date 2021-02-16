import loadable from '@loadable/component'

export const Page = loadable(() => import('./Page/Page'))
export const Container = loadable(() => import('./Container/Container'))
export const Header = loadable(() => import('./Header/Header'))
export const Footer = loadable(() => import('./Footer/Footer'))
export const Calendar = loadable(() => import('./Calendar/Calendar'))
export const List = loadable(() => import('./List/List'))
export const Select = loadable(() => import('./Select/Select'))
export const Autocomplete = loadable(() => import('./Autocomplete/Autocomplete'))
export const Modals = loadable(() => import('./Modals/Modals'))
export const SEO = loadable(() => import('./SEO'))

export * from './Page/Page'
export * from './Container/Container'
export * from './Header/Header'
export * from './Footer/Footer'
export * from './Calendar/Calendar'
export * from './SEO'
export * from './List/List'
export * from './Select/Select'
export * from './Autocomplete/Autocomplete'
