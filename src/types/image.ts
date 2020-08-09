import { FluidObject, FixedObject } from 'gatsby-image'

export type ImageEdge = {
  node: {
    childImageSharp?: {
      sizes: FluidObject | FixedObject
    }
    name: string
    relativePath: string
  }
}

export type AllImageFiles = {
  edges: ImageEdge[]
}
