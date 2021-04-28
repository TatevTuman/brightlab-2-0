import { graphql, useStaticQuery } from 'gatsby'
import { SiteMetadata } from '@types'

// See gatsby-config.js
const GetSiteMetadata = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
          summary
        }
        description
        siteUrl
        navigation {
          path
          label
        }
      }
    }
  }
`

const useSiteMetadata = () => {
  return useStaticQuery<SiteMetadata>(GetSiteMetadata).site.siteMetadata
}

export default useSiteMetadata
