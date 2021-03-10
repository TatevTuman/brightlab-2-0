export * from './lists'
export * from './table'
export * from './forms'
export * from './apollo'
export * from './cache'
export * from './dates'

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type FlexAlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch'
export type FlexJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'
export type GridItemsAlign = 'start' | 'end' | 'center' | 'stretch'
export type GridContentAlign =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

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
export type AnyObject = Record<string, any>

export type OptionSchema = {
  [x: string]: string | ((item: any) => string)
}

export type SiteMetadataNavigationRoute = {
  path: string
  label: string
}

export type SiteMetadataNavigation = SiteMetadataNavigationRoute[]

export type SiteMetadata = {
  site: {
    siteMetadata: {
      title: string
      author: {
        name: string
        summary: string
      }
      description: string
      siteUrl: string
      navigation: SiteMetadataNavigation
    }
  }
}
