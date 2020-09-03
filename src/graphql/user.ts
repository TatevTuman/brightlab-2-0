import { gql } from '@apollo/client'
import { UserFragments } from '@fragments'

export const FetchUsers = gql`
  query fetchUsers {
    users {
      ...UserFields
    }
  }

  ${UserFragments}
`

export const FetchUser = gql`
  query fetchUser($id: String!) {
    user(id: $id) {
      ...UserFields
    }
  }

  ${UserFragments}
`

export const FetchCurrentUser = gql`
  query fetchCurrentUser {
    user: currentUser {
      ...UserFields
    }
  }

  ${UserFragments}
`

export const CreateUser = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      ...UserFields
    }
  }

  ${UserFragments}
`

export const UpdateUser = gql`
  mutation updateUser($id: Int!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      ...UserFields
    }
  }

  ${UserFragments}
`

export const DeleteUser = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`

export const SignUp = gql`
  mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password)
  }
`

export const SignIn = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`
