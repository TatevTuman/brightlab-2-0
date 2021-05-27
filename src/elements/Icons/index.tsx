import loadable from '@loadable/component'

export interface CommonIconProps {
  className?: string
  onClick?(): void
}

/*
  Usage
  import * as Icon from '@svg'

  <Icon.Times {...props} />
*/

export const Times = loadable(() => import('./svg/Times'))

export * from './svg/Times'
