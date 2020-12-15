import { gql } from '@apollo/client'

export { default as golfClubModelFragments } from './golfClubModel'

export default gql`
  fragment PaginationAttrs on PaginationResponse {
    itemCount
    total
    pageSize
    totalPages
    current
  }
`
