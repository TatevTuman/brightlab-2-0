import React, { memo } from 'react'
import { graphql } from 'gatsby'
import { SEO, Container } from '@components'
import { Link } from '@elements'
import { LayersProps } from '@layers'

interface NotFoundPageProps extends LayersProps {
  data: { site: { siteMetadata: { title: string } } }
  location: any
}

const NotFoundPage: React.FC<NotFoundPageProps> = props => {
  const { data, location } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <section>
      <Container>
        <SEO title={'404: Not Found'} />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link to="/">Go home</Link>
      </Container>
    </section>
  )
}

export default memo(NotFoundPage)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
