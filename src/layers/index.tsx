import loadable from '@loadable/component'
import { BaseLayerProps, BaseLayerState, BaseLayerMethods } from './Base'
import { AuthLayerProps, AuthLayerState, AuthLayerMethods } from './Auth'
import { PageLayerProps, PageLayerState, PageLayerMethods } from './Page'

export const BaseLayer = loadable(() => import('./Base'))
export const AuthLayer = loadable(() => import('./Auth'))
export const PageLayer = loadable(() => import('./Page'))

export type LayersProps = {
  baseMethods: BaseLayerMethods
  authMethods: AuthLayerMethods
  pageMethods: PageLayerMethods
} & BaseLayerProps &
  BaseLayerState &
  AuthLayerProps &
  AuthLayerState &
  PageLayerProps &
  PageLayerState
