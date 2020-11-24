import loadable from '@loadable/component'

export const Page = loadable(() => import('./Page/Page'))
export const Container = loadable(() => import('./Container/Container'))
export const Header = loadable(() => import('./Header/Header'))
export const Footer = loadable(() => import('./Footer/Footer'))

export const SEO = loadable(() => import('./SEO'))
export const ErrorBoundary = loadable(() => import('./ErrorBoundary/ErrorBoundary'))

export { default as Form } from './Form/Form'
export { default as Modal } from './Modal/Modal'
export { default as Drawer } from './Drawer/Drawer'

export * from './modals'
export * from './drawers'
