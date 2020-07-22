import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from '@components'

interface NotFoundPageProps {
  data: { site: { siteMetadata: { title: string } } }
  location: any
}

const NotFoundPage: React.FC<NotFoundPageProps> = props => {
  const { data, location } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <div>
      <SEO title={'404: Not Found'} />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
