import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Page, Header, Footer } from '@components'
import client from './gatsby-apollo'
import '@styles/app.scss'

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element, props }) => {
  // All routing logic is in the Page component
  return <Page {...props}>{React.createElement(element.type, props)}</Page>
}

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <div role={'main'}>
        <Header />
        {element}
        <Footer />
      </div>
    </ApolloProvider>
  )
}