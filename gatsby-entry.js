import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Provider as AlertProvider, transitions } from 'react-alert'
import { Alert, Page, Header, Footer } from '@elements'
import client from './gatsby-apollo'
import '@styles/root.css'

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
  const alertOptions = {
    position: 'top right',
    timeout: 2000,
    offset: '25px 30px -10px',
    transition: transitions.SCALE
  }

  return (
    <ApolloProvider client={client}>
      <AlertProvider template={Alert} {...alertOptions}>
        {element}
      </AlertProvider>
    </ApolloProvider>
  )
}
