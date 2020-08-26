import { gql } from '@apollo/client'
import { UserFragments } from '@fragments'

export const fetchUsers = gql`
  query fetchUsers {
    users {
      ...UserFields
    }
  }

  ${UserFragments}
`

export const fetchUser = gql`
  query fetchUser($id: String!) {
    user(id: $id) {
      ...UserFields
    }
  }

  ${UserFragments}
`

export const createUser = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      ...UserFields
    }
  }

  ${UserFragments}
`

export const updateUser = gql`
  mutation updateUser($id: Int!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      ...UserFields
    }
  }

  ${UserFragments}
`

export const deleteUser = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`
