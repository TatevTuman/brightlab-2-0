import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Page } from '@elements'
import ApolloClient from './apollo'
import '@styles/app.scss'

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element, props }) => {
  return <Page {...props}>{element}</Page>
}

export const wrapRootElement = ({ element, props }) => {
  return (
    <ApolloProvider client={ApolloClient}>
      {element}
    </ApolloProvider>
  )
}
