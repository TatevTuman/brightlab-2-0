export * from './lists'
export * from './table'
export * from './forms'
export * from './apollo'
export * from './cache'
export * from './dates'

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
