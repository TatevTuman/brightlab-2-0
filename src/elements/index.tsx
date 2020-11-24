import loadable from '@loadable/component'

export const Button = loadable(() => import('./Button/Button'))
export const Image = loadable(() => import('./Image/Image'))
export const Link = loadable(() => import('./Link/Link'))
export const Input = loadable(() => import('./Input/Input'))
export const Checkbox = loadable(() => import('./Checkbox/Checkbox'))
export const Navigation = loadable(() => import('./Navigation/Navigation'))

export { default as Select } from './Select/Select'
export { default as Dropdown } from './Dropdown/Dropdown'
