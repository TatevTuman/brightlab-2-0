import loadable from '@loadable/component'

export const Switch = loadable(() => import('./Switch'))
export const Checkbox = loadable(() => import('./Checkbox'))
export const Radio = loadable(() => import('./Radio'))
export const Button = loadable(() => import('./Button'))

export * from './Switch'
export * from './Checkbox'
export * from './Radio'
export * from './Button'
