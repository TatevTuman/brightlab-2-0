import fetch from 'cross-fetch'
import { onError } from '@apollo/client/link/error'
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, from } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      // In most inventory management systems, a single UPC code uniquely
      // identifies any product.
      keyFields: ['upc']
    },
    Person: {
      // In some user account systems, names or emails alone do not have to
      // be unique, but the combination of a person's name and email is
      // uniquely identifying.
      keyFields: ['name', 'email']
    },
    Book: {
      // If one of the keyFields is an object with fields of its own, you can
      // include those nested keyFields by using a nested array of strings:
      keyFields: ['title', 'author', ['name']]
    }
  }
})

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

const errorLink = onError(({ graphQLErrors, networkError}) => {
  if (networkError) {
    const { name, message, stack } = networkError

    networkError = {
      name,
      message,
      stack,
      graphQLErrors
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
  cache,
  connectToDevTools: true
})
