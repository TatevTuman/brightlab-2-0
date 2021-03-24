// import { useAlert } from 'react-alert'
// import { navigate } from 'gatsby'
// import { useMutation } from '@apollo/client'
// import { auth } from '@graphql'
// import { useRequestErrorHandler } from '@hooks'
// import { SignInFormType, SignUpFormType, MutationResponse, ResponseType, User } from '@types'
//
// const useGraphqlAuth = () => {
//   const alert = useAlert()
//   const handleRequestError = useRequestErrorHandler()
//
//   const [handleSignIn] = useMutation<
//     ResponseType<MutationResponse & { token: string; currentUser: User }>,
//     SignInFormType
//   >(auth.SignIn, { onError: error => handleRequestError(null, error) })
//
//   const [handleSignUp] = useMutation<
//     ResponseType<MutationResponse & { token: string; currentUser: User }>,
//     SignUpFormType
//   >(auth.SignUp, {
//     onError: error => handleRequestError(null, error)
//   })
//
//   const signIn = async (form: SignInFormType) => {
//     const request = await handleSignIn({
//       variables: form,
//       update: async (cache, mutationResult) => {
//         const { data } = mutationResult
//
//         if (data) {
//           const {
//             res: { token, error }
//           } = data
//
//           if (error) return null
//
//           alert.show(`Welcome back!`, {
//             type: 'success'
//           })
//
//           localStorage.setItem('token', token)
//           await navigate('/')
//         }
//       }
//     })
//
//     return handleRequestError(request)
//   }
//
//   const signUp = async (form: SignUpFormType) => {
//     const request = await handleSignUp({
//       variables: form,
//       update: async (cache, mutationResult) => {
//         const { data } = mutationResult
//
//         if (data) {
//           const {
//             res: { token, error }
//           } = data
//
//           if (error) return null
//
//           alert.show(`Welcome!`, {
//             type: 'success'
//           })
//
//           localStorage.setItem('token', token)
//           await navigate('/sign-up/select-company')
//         }
//       }
//     })
//
//     return handleRequestError(request)
//   }
//
//   return { signIn, signUp }
// }
//
// export default useGraphqlAuth
