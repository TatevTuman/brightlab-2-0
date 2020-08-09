import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { AllImageFiles } from '@types'
import { graphql, StaticQuery } from 'gatsby'

interface ImageProps {
  filename: string
  alt?: string
}

const Image: React.FC<ImageProps> = props => {
  const { filename, alt } = props

  return (
    <StaticQuery<{ images: AllImageFiles }>
      query={graphql`
        query {
          images: allFile {
            edges {
              node {
                relativePath
                name
                childImageSharp {
                  sizes(maxWidth: 1200, maxHeight: 800) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const image = data.images.edges.find(n => {
          return n.node.relativePath.includes(filename)
        })

        if (!image) {
          return null
        }

        const imageSharp = image.node.childImageSharp
        const imageSizes = imageSharp && (imageSharp.sizes as FluidObject)

        return <Img alt={alt} sizes={imageSizes} />
      }}
    />
  )
}

export default Image

export const query = graphql`
  fragment ImageFluid on File {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }

  fragment ImageFixed600x600 on File {
    childImageSharp {
      fixed(width: 600, height: 600) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
