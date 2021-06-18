import { graphql, useStaticQuery } from 'gatsby'
import { SiteMetadata } from '~types'

const useSiteMetadata = () => {
  return useStaticQuery<SiteMetadata>( // See gatsby-config.js
    graphql`
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
  ).site.siteMetadata
}

export default useSiteMetadata
