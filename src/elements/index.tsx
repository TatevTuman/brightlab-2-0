import loadable from '@loadable/component'

export const Loader = loadable(() => import('./Loader/Loader'))
export const Fallback = loadable(() => import('./Fallback/Fallback'))
export const Page = loadable(() => import('./Page/Page'))
export const Container = loadable(() => import('./Container/Container'))
export const Header = loadable(() => import('./Header/Header'))
export const Footer = loadable(() => import('./Footer/Footer'))
export const Alert = loadable(() => import('./Alert/Alert'))

export * from './Image/Image'
export * from './Alert/Alert'
export * from './Loader/Loader'
export * from './Fallback/Fallback'
export * from './Page/Page'
export * from './Container/Container'
export * from './Header/Header'
export * from './Footer/Footer'
