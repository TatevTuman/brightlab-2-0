import React, { memo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Container } from '@components'
import { SiteRoute } from '@types'
import './Page.scss'

const GetSiteNavigation = graphql`
  query {
    site {
      siteMetadata {
        navigation {
          path
          label
        }
      }
    }
  }
`

interface PageProps extends RouteComponentProps {
  children: JSX.Element | JSX.Element[]
}

const Page: React.FC<PageProps> = props => {
  const { children, path } = props
  const { navigation } = useStaticQuery(GetSiteNavigation).site.siteMetadata

  const page = navigation.find((page: SiteRoute) => page.path === path)

  if (!page) {
    console.warn('Client: Couldn`t find a page with', path, 'route', 'please add this page info into gatsby-config.js')
  }

  return (
    <div className="page">
      <Container>{children}</Container>
    </div>
  )
}

export default memo(Page)
