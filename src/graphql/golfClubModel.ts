import { gql } from '@apollo/client'
import { golfClubModelFragments } from './fragments'

export const FetchAll = gql`
  query FetchGolfClubModels {
    golfClubModels {
      ...GolfClubModelAttrs
    }
  }

  ${golfClubModelFragments}
`

export const FetchOne = gql`
  query FetchGolfClubModel($id: String!) {
    golfClubModel(id: $id) {
      ...GolfClubModelAttrs
    }
  }

  ${golfClubModelFragments}
`
