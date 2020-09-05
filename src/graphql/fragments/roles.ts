import { gql } from '@apollo/client'

export default gql`
  fragment RoleFields on Role {
    id
    name
  }
`
