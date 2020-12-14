import { gql } from '@apollo/client'

export const FetchAll = gql`
  query FetchGolfClubModels {
    golfClubModels {
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
  }
`

export const FetchOne = gql`
  query FetchGolfClubModel($id: String!) {
    golfClubModel(id: $id) {
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
  }
`
