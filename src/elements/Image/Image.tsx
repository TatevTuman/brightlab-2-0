import React from 'react'
import Img from 'gatsby-image'
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
                  sizes(maxWidth: 600) {
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
        const imageSizes = imageSharp && imageSharp.sizes

        return <Img alt={alt} sizes={imageSizes} />
      }}
    />
  )
}

export default Image
