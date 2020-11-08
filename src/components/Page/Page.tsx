import React, { memo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Container } from '@components'
import { Site } from '@types'
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
  path: string
  children: JSX.Element | JSX.Element[]
}

const Page: React.FC<PageProps> = props => {
  const { children, path } = props
  const { navigation } = useStaticQuery<Site>(GetSiteNavigation).site.siteMetadata

  const isDynamicPage = path.includes('/*')
  const pathWithoutSlash = path.slice(0, isDynamicPage ? -2 : -1)
  const page = navigation.find(page => page.path === pathWithoutSlash)

  return (
    <div className="page">
      <Container>{children}</Container>
    </div>
  )
}

Page.defaultProps = {
  path: ''
}

export default memo(Page)
