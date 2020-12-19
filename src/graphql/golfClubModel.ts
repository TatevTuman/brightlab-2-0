import { gql } from '@apollo/client'
import fragments, { golfClubModelFragments } from './fragments'

export const FetchAll = gql`
  query FetchGolfClubModels {
    res: golfClubModels {
      ...GolfClubModelAttrs
    }
  }

  ${golfClubModelFragments}
`

export const FetchPaginated = gql`
  query FetchPaginatedGolfClubModels($pagination: PaginationArgs!, $filters: FilterArgs, $sortBy: String) {
    res: paginateGolfClubModels(pagination: $pagination, filters: $filters, sortBy: $sortBy) {
      content {
        ...GolfClubModelAttrs
      }
      pagination {
        ...PaginationAttrs
      }
    }
  }

  ${golfClubModelFragments}
  ${fragments}
`

export const FetchOne = gql`
  query FetchGolfClubModel($id: String!) {
    res: golfClubModel(id: $id) {
      ...GolfClubModelAttrs
    }
  }

  ${golfClubModelFragments}
`
