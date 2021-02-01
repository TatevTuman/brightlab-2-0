import { gql } from '@apollo/client'

export const UserBasicInfoAttrs = gql`
  fragment UserBasicInfoAttrs on BasicInfo {
    gripSize
    height
    dexterity
    flex
  }
`

export const UserAttrs = gql`
  fragment UserAttrs on User {
    id
    email
    firstName
    lastName
    userName
    avatar
    basicInfo {
      ...UserBasicInfoAttrs
    }
  }

  ${UserBasicInfoAttrs}
`
