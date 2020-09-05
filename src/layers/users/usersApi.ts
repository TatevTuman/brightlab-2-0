import { FetchCurrentUser, SignIn, SignUp } from '@graphql'
import { SignInForm, SignUpForm, Client } from '@types'

export interface UsersLayerApi {
  handleSignIn(data: SignInForm): Promise<string | null>
  handleSignUp(data: SignUpForm): Promise<string | null>
}

export default (client: Client): UsersLayerApi => {
  return {
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
              if (typeof window !== 'undefined') {
                localStorage.setItem('token', token)
              }
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
        console.log('e', e)
        throw new Error(e)
      }
    }
  }
}
