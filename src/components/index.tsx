import loadable from '@loadable/component'

export const Page = loadable(() => import('./Page/Page'))
export const Container = loadable(() => import('./Container/Container'))
export const Header = loadable(() => import('./Header/Header'))
export const SEO = loadable(() => import('./SEO'))
