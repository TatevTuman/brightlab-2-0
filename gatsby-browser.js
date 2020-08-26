import React from 'react'
import { ApolloProvider } from '@apollo/client'
import ApolloClient from './apollo'
import { Header } from '@components'
import { Page } from '@elements'
import '@styles/app.scss'

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element, props }) => {
  return <Page {...props}>{element}</Page>
}

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={ApolloClient}>
      <div>
        <Header />
        {element}
      </div>
    </ApolloProvider>
  )
}
