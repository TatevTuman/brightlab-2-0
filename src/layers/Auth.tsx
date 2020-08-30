import React, { memo, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { FetchCurrentUser, SignIn, SignUp } from '@graphql'
import { SignInForm, SignUpForm } from '@types'
import { ApolloClient } from '@apollo/client'

export interface AuthLayerMethods {
  fetchCurrentUser(): Promise<{ currentUser: any }> // TODO user
  handleSignIn(data: SignInForm): Promise<string | null>
  handleSignUp(data: SignUpForm): Promise<string | null>
}
export interface AuthLayerState {
  auth: boolean
}
export interface AuthLayerProps extends RouteComponentProps {
  client: ApolloClient<Record<string, any>>
  children(auth: {
    state: AuthLayerState
    props: Omit<AuthLayerProps, 'children' | 'client'>
    authMethods: AuthLayerMethods
  }): JSX.Element | JSX.Element[]
}

const AuthLayer: React.FC<AuthLayerProps> = props => {
  const { children, client, ...otherProps } = props
  const [state, setState] = useState<AuthLayerState>({ auth: true })

  const authMethods: AuthLayerMethods = {
    // TODO user
    async fetchCurrentUser(): Promise<any> {
      try {
        // TODO user
        const request = await client.mutate<{ currentUser: any }>({ mutation: FetchCurrentUser })

        if (request && request.data) {
          const { currentUser } = request.data
          return currentUser
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

  return <>{children({ state, props: otherProps, authMethods })}</>
}

export default memo(AuthLayer)
