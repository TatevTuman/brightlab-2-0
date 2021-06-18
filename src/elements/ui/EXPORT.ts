import loadable from '@loadable/component'

export const Switch = loadable(() => import('./Switch'))
export const Checkbox = loadable(() => import('./Checkbox'))
export const Radio = loadable(() => import('./Radio'))
export const Button = loadable(() => import('./Button'))
export const TextInput = loadable(() => import('./TextInput'))
export const Select = loadable(() => import('./Select'))

export * from './Switch'
export * from './Checkbox'
export * from './Radio'
export * from './Button'
export * from './TextInput'
export * from './Select'
