import { gql } from '@apollo/client'
import { BookFragments } from '@fragments'

export default gql`
  fragment UserFields on User {
    id
    firstName
    lastName
    email
    password
    books {
      ...BookFields
    }
  }

  ${BookFragments}
`
