import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Page, Header, Footer, Modals } from '@components'
import client from './gatsby-apollo'
import '@styles/app.scss'
import '@styles/typography.scss'

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element, props }) => {
  // All routing logic is in the Page component
  return (
    <>
      <Header />
      <Page {...props}>{React.createElement(element.type, props)}</Page>
      <Footer />
    </>
  )
}

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <Modals />
      {element}
    </ApolloProvider>
  )
}
