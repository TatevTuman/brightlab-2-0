import React from 'react'
import { ApolloProvider } from '@apollo/client'
import ApolloClient from './apollo'
import { Header } from '@components'
import { Page } from '@elements'
import '@styles/app.scss'

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element, props }) => {
  // We are going through layers and collect common props and methods
  return <Page>{React.createElement(element.type, props)}</Page>
}

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={ApolloClient}>
      <div role={'main'}>
        <Header />
        {element}
      </div>
    </ApolloProvider>
  )
}
