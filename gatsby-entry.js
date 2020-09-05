import React from 'react'
import fetch from 'cross-fetch'
import { onError } from '@apollo/client/link/error'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, ApolloLink, from } from '@apollo/client'
import { Page, Header } from '@components'
import '@styles/app.scss'

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    const { name, message, stack } = networkError
    /* @ts-ignore */
    networkError.custom = {
      name,
      message,
      stack,
      graphQLErrors
    }
  }
})

const httpLink = new HttpLink({
  uri: process.env.GATSBY_API,
  fetch
})

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache,
  connectToDevTools: true
})

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element, props }) => {
  // All routing and roles logic are in the Page component
  return <Page {...props}>{React.createElement(element.type, props)}</Page>
}

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <div role={'main'}>
        <Header />
        {element}
      </div>
    </ApolloProvider>
  )
}
