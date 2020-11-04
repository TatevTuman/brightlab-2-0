export * from './lists'
export * from './table'
export * from './forms'
export * from './apollo'
export * from './generated'

export type SiteRoute = {
  path: string
  label: string
}

export type Site = {
  site: {
    siteMetadata: {
      title: string
      author: {
        name: string
        summary: string
      }
      description: string
      siteUrl: string
      navigation: SiteRoute[]
    }
  }
}
