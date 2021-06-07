import { Argument } from 'classnames'

export * from './lists'
export * from './forms'
export * from './cache'
export * from './dates'
export * from './icons'
export * from './apollo'

export type BreakpointName = 'mobile' | 'landscape' | 'tablet' | 'desktop'

export enum Breakpoint {
  mobile = 576,
  landscape = 768,
  tablet = 992,
  desktop = 1440
}

export type ShortBreakpointName = 'xs' | 'sm' | 'md' | 'lg'

export enum ShortBreakpoint {
  xs = Breakpoint.mobile,
  sm = Breakpoint.landscape,
  md = Breakpoint.tablet,
  lg = Breakpoint.desktop
}

export type Children = JSX.Element | JSX.Element[] | string
export type ClassName = Argument

export type SiteMetadataNavigationRoute = {
  path: string
  label: string
  icon?: string
}

export type SiteMetadataNavigation = SiteMetadataNavigationRoute[]

/* Should be synced with gatsby-config.js */
export type SiteMetadata = {
  site: {
    siteMetadata: {
      title: string
      author: string
      description: string
      siteUrl: string
      navigation: SiteMetadataNavigation
    }
  }
}
