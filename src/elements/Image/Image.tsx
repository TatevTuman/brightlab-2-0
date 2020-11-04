import React, { memo } from 'react'
import Img, { FluidObject, FixedObject } from 'gatsby-image'
import { graphql, StaticQuery } from 'gatsby'

export interface ImageProps {
  filename: string
  alt?: string
}

export type ImageEdge = {
  node: {
    childImageSharp: {
      sizes: FluidObject | FixedObject
    }
    name: string
    relativePath: string
  }
}

export type AllImageFiles = {
  edges: ImageEdge[]
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

        return <Img alt={alt} fluid={imageSizes} />
      }}
    />
  )
}

export default memo(Image)

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
