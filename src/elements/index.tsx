import loadable from '@loadable/component'

export const Button = loadable(() => import('./Button/Button'))
export const Image = loadable(() => import('./Image/Image'))
export const Link = loadable(() => import('./Link/Link'))
export const Input = loadable(() => import('./Input/Input'))
export const Checkbox = loadable(() => import('./Checkbox/Checkbox'))
export const Navigation = loadable(() => import('./Navigation/Navigation'))
export const Dropdown = loadable(() => import('./Dropdown/Dropdown'))
export const Alert = loadable(() => import('./Alert/Alert'))
export const Loader = loadable(() => import('./Loader/Loader'))
export const Pagination = loadable(() => import('./Pagination/Pagination'))
export const ValidationErrorMessage = loadable(() => import('./ValidationErrorMessage/ValidationErrorMessage'))
export const Fallback = loadable(() => import('./Fallback/Fallback'))

export * from './Button/Button'
export * from './Image/Image'
export * from './Link/Link'
export * from './Input/Input'
export * from './Checkbox/Checkbox'
export * from './Navigation/Navigation'
export * from './Dropdown/Dropdown'
export * from './Alert/Alert'
export * from './Loader/Loader'
export * from './Pagination/Pagination'
export * from './ValidationErrorMessage/ValidationErrorMessage'
export * from './Fallback/Fallback'
