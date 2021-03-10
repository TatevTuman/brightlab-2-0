// import { gql } from '@apollo/client'
// import { UserAttrs, UserResponseAttrs } from '@fragments'
//
// export const FetchCurrentUser = gql`
//   query FetchCurrentUser {
//     res: currentUser {
//       ...UserAttrs
//     }
//   }
//
//   ${UserAttrs}
// `
//
// export const UpdateCurrentUser = gql`
//   mutation UpdateCurrentUser($user: UserArgs) {
//     res: updateCurrentUser(user: $user) {
//       ...UserResponseAttrs
//       result {
//         ...UserAttrs
//       }
//     }
//   }
//
//   ${UserAttrs}
//   ${UserResponseAttrs}
// `
