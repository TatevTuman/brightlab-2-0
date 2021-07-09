/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Provider as AlertProvider, transitions } from 'react-alert'
import { PageLayout } from '~layouts'
import { Header, Footer } from '~sections'
import { Alert } from '~ux'
import client from './gatsby-apollo'
import '~styles/app.css'

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element: page, props }) => {
  // All routing logic is in the Page component

  return (
    <div className="flex flex-col min-h-screen font-sans text-black">
      <Header />
      <PageLayout {...props}>{page}</PageLayout>
      <Footer />
    </div>
  )
}

export const wrapRootElement = ({ element: root }) => {
  const alertOptions = {
    position: 'top right',
    timeout: 2000,
    offset: '25px 30px -10px',
    transition: transitions.SCALE
  }

  return (
    <ApolloProvider client={client}>
      <AlertProvider template={Alert} {...alertOptions}>
        {root}
      </AlertProvider>
    </ApolloProvider>
  )
}
