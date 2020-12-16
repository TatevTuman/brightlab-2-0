import { gql } from '@apollo/client'

export default gql`
  fragment GolfClubModelAttrs on GolfClubModel {
    id
    name
    description
    releaseYear
    retailPrice
    flex
    dexterity
    category {
      ...CategoryAttrs
    }
    brand {
      ...BrandAttrs
    }
  }

  fragment BrandAttrs on Brand {
    id
    name
  }

  fragment CategoryAttrs on Category {
    id
    name
  }
`
