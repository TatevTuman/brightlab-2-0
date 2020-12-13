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
export const ValidationErrorMessage = loadable(() => import('./ValidationErrorMessage/ValidationErrorMessage'))

export type { ButtonProps } from './Button/Button'
export type { CheckboxProps } from './Checkbox/Checkbox'
export type { ValidationErrorMessageProps } from './ValidationErrorMessage/ValidationErrorMessage'
