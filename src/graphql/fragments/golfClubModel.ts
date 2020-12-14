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
      id
      name
    }
    brand {
      id
      name
    }
    categoryId
    brandId
  }
`
