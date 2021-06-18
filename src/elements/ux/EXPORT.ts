import loadable from '@loadable/component'

export const Alert = loadable(() => import('./Alert'))
export const Menu = loadable(() => import('./Menu'))
export const ListBox = loadable(() => import('./ListBox'))
export const Disclosure = loadable(() => import('./Disclosure'))
export const Dialog = loadable(() => import('./Dialog'))
export const Loader = loadable(() => import('./Loader'))

export * from './Alert'
export * from './Menu'
export * from './ListBox'
export * from './Disclosure'
export * from './Dialog'
export * from './Loader'
