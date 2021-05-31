/*
import { useAlert } from "react-alert"
import { navigate } from "gatsby"
import { useMutation } from "@apollo/client"
import { auth, user } from "~graphql"
import { useRequestErrorHandler } from "~hooks"
import {
  SignInFormType,
  SignUpFormType,
  MutationResponse,
  ResponseType,
} from "~types"

type SignMutationResponse = ResponseType<MutationResponse<{ token: string }>>

const useGraphqlAuth = () => {
  const alert = useAlert()
  const handleRequestError = useRequestErrorHandler()

  const [handleSignIn] = useMutation<SignMutationResponse, SignInFormType>(
    auth.SignIn,
    {
      refetchQueries: [{ query: user.FetchCurrent }],
      onError: error => handleRequestError(null, error),
    }
  )

  const [handleSignUp] = useMutation<SignMutationResponse, SignUpFormType>(
    auth.SignUp,
    {
      onError: error => handleRequestError(null, error),
    }
  )

  const redirectSignUp = (data: any) => {
    if (data?.res.successful) {
      navigate("/sign-in")
    }
  }

  const redirectSignIn = (data: any) => {
    if (data?.res.successful) {
      navigate("/menu/create")
    }
  }

  const signIn = async (form: SignInFormType) => {
    const request = await handleSignIn({
      variables: form,
      refetchQueries: [{ query: user.FetchCurrent }],
      update: async (cache, mutationResult) => {
        const { data } = mutationResult

        if (data) {
          const {
            res: { result, messages },
          } = data

          if (messages?.length) return null

          if (data.res.successful) {
            alert.show(`Welcome back!`, {
              type: "success",
            })
          } else {
            alert.show(`Something wrong...`, {
              type: "error",
            })
          }

          localStorage.setItem("token", result.token)
          await redirectSignIn(data)
        }
      },
    })

    return handleRequestError(request)
  }

  const signUp = async (form: SignUpFormType) => {
    const request = await handleSignUp({
      variables: form,
      update: async (cache, mutationResult) => {
        const { data } = mutationResult

        if (data) {
          const {
            res: { result, messages },
          } = data

          if (messages?.length) return null

          alert.show(`Welcome!`, {
            type: "success",
          })

          localStorage.setItem("token", result.token)

          await redirectSignUp(data)
        }
      },
    })

    return handleRequestError(request)
  }

  return { signIn, signUp }
}

export default useGraphqlAuth
*/
