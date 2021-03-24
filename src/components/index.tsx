import loadable from '@loadable/component'

export const Select = loadable(() => import('./Select/Select'))
export const Autocomplete = loadable(() => import('./Autocomplete/Autocomplete'))
export const SEO = loadable(() => import('./SEO'))

export * from './SEO'
export * from './Select/Select'
export * from './Autocomplete/Autocomplete'
