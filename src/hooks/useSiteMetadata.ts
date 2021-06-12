import { graphql, useStaticQuery } from 'gatsby'
import { SiteMetadata } from '~types'

// See gatsby-config.js
const GetSiteMetadata = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        description
        navigation {
          path
          label
          icon
        }
      }
    }
  }
`

const useSiteMetadata = () => {
  return useStaticQuery<SiteMetadata>(GetSiteMetadata).site.siteMetadata
}

export default useSiteMetadata
