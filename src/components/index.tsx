import loadable, { LoadableComponent } from '@loadable/component'

import { PageProps } from './Page/Page'
import { ContainerProps } from './Container/Container'
import { HeaderProps } from './Header/Header'
import { FooterProps } from './Footer/Footer'
import { HomeModalProps } from './HomeModal/HomeModal'
import { ErrorBoundaryProps } from './ErrorBoundary/ErrorBoundary'
import { SeoProps } from './SEO'

export const Page: LoadableComponent<PageProps> = loadable(() => import('./Page/Page'))
export const Container: LoadableComponent<ContainerProps> = loadable(() => import('./Container/Container'))
export const Header: LoadableComponent<HeaderProps> = loadable(() => import('./Header/Header'))
export const Footer: LoadableComponent<FooterProps> = loadable(() => import('./Footer/Footer'))

export const HomeModal: LoadableComponent<HomeModalProps> = loadable(() => import('./HomeModal/HomeModal'))

export const SEO: LoadableComponent<SeoProps> = loadable(() => import('./SEO'))
export const ErrorBoundary: LoadableComponent<ErrorBoundaryProps> = loadable(
  () => import('./ErrorBoundary/ErrorBoundary')
)

// Because a module
export { default as Modal } from './Modal/Modal'

// Because a module
export { default as Form } from './Form/Form'
