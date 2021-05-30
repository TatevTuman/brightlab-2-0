/*
import { gql } from "@apollo/client"

export const MessagesResponseAttrs = gql`
  fragment MessagesResponseAttrs on ValidationMessage {
    code
    field
    message
    options {
      key
      value
    }
    template
  }
`

export const SignResponseAttrs = gql`
  fragment SignResponseAttrs on UserToken {
    successful
    messages {
      ...MessagesResponseAttrs
    }
    result {
      token
    }
  }

  ${MessagesResponseAttrs}
`
*/
