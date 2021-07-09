import loadable from '@loadable/component'

export const Switch = loadable(() => import('./Switch'))
export const Checkbox = loadable(() => import('./Checkbox'))
export const Radio = loadable(() => import('./Radio'))
export const Button = loadable(() => import('./Button'))
export const TextInput = loadable(() => import('./TextInput'))
export const TextArea = loadable(() => import('./TextArea'))
export const Select = loadable(() => import('./Select'))
export const DateTimeSelect = loadable(() => import('./DateTimeSelect'))
export const MultiSelect = loadable(() => import('./MultiSelect'))
export const Autocomplete = loadable(() => import('./Autocomplete'))
export const ContextMenu = loadable(() => import('./ContextMenu'))

export const Table = loadable(() => import('./Table/Table'))
export const DatePicker = loadable(() => import('./DatePicker/DatePicker'))
export const DateRangePicker = loadable(() => import('./DatePicker/DateRangePicker'))

export * from './Switch'
export * from './Checkbox'
export * from './Radio'
export * from './Button'
export * from './TextInput'
export * from './TextArea'
export * from './Select'
export * from './DateTimeSelect'
export * from './MultiSelect'
export * from './Autocomplete'
export * from './ContextMenu'

export * from './Table/Table'
export * from './DatePicker/DatePicker'
export * from './DatePicker/DateRangePicker'
