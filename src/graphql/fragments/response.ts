import { gql } from '@apollo/client'

export const ErrorResponseAttrs = gql`
  fragment ErrorResponseAttrs on ErrorResponse {
    code
    detail
  }
`

export const StatusResponseAttrs = gql`
  fragment StatusResponseAttrs on StatusResponse {
    status
    error {
      ...ErrorResponseAttrs
    }
  }

  ${ErrorResponseAttrs}
`

export const UserResponseAttrs = gql`
  fragment UserResponseAttrs on UserResponse {
    status
    error {
      ...ErrorResponseAttrs
    }
  }

  ${ErrorResponseAttrs}
`
