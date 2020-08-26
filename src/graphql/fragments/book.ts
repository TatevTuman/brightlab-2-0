import { gql } from '@apollo/client'

export default gql`
  fragment BookFields on Book {
    id
    title
    author
  }
`
