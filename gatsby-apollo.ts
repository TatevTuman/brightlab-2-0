import fetch from 'cross-fetch'
import { ApolloClient, HttpLink, ApolloLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import gatsbyApolloCache from './gatsby-apollo-cache'

const authLink = new ApolloLink((operation, forward) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }))
  }

  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    const { name, message, stack } = networkError

    networkError = {
      name,
      message,
      stack
    }
  }
})

const isDevelopment = process.env.NODE_ENV !== 'production'
const uri = isDevelopment ? process.env.GATSBY_DEV_API : process.env.GATSBY_PROD_API

const httpLink = new HttpLink({
  uri,
  fetch
})

export default new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: gatsbyApolloCache,
  connectToDevTools: true
})
