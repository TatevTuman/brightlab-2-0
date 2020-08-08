export type GatsbyImageSharpSizes = {
  aspectRatio: number
  base64: string
  sizes: string
  src: string
  srcSet: string
}

export type ImageEdge = {
  node: {
    childImageSharp?: {
      sizes: GatsbyImageSharpSizes
    }
    name: string
    relativePath: string
  }
}

export type AllImageFiles = {
  edges: ImageEdge[]
}
