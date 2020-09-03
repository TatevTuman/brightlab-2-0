import { FetchCurrentUser, SignIn, SignUp } from '@graphql'
import { SignInForm, SignUpForm, Client, User } from '@types'

export interface AuthLayerMethods {
  fetchCurrentUser(): Promise<{ user: User }>
  handleSignIn(data: SignInForm): Promise<string | null>
  handleSignUp(data: SignUpForm): Promise<string | null>
}

export default (client: Client): AuthLayerMethods => {
  return {
    async fetchCurrentUser(): Promise<User> {
      try {
        const request = await client.mutate<{ user: User }>({ mutation: FetchCurrentUser })

        if (request && request.data) {
          const { user } = request.data
          return user
        } else {
          return null
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    async handleSignUp(data: SignUpForm) {
      try {
        const request = await client.mutate<{ signup: string }, SignUpForm>({
          mutation: SignUp,
          variables: data
        })

        if (request && request.data) {
          const { signup: token } = request.data
          return token
        } else {
          return null
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    async handleSignIn(data: SignInForm) {
      try {
        const request = await client.mutate<{ signin: string }, SignInForm>({
          mutation: SignIn,
          variables: data,
          refetchQueries: res => {
            if (res && res.data) {
              const { signin: token } = res.data
              localStorage.setItem('token', token)
              return [{ query: FetchCurrentUser }]
            }

            return []
          }
        })

        if (request && request.data) {
          const { signin: token } = request.data
          return token
        } else {
          return null
        }
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
