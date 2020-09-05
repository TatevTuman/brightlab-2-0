import { gql } from '@apollo/client'
import { RoleFragments } from '@fragments'

export const FetchRoles = gql`
  query fetchRoles {
    roles {
      ...RoleFields
    }
  }

  ${RoleFragments}
`

export const CreateRole = gql`
  mutation createRole($name: String!) {
    createRole(name: $name) {
      ...RoleFields
    }
  }
`
