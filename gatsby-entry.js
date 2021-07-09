import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Provider as AlertProvider, transitions } from 'react-alert'
import { PageLayout, AuthLayout } from '~layouts'
import { Alert } from '~ux'
import client from './gatsby-apollo'
import '@fontsource/nunito-sans'
import '~styles/app.css'

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element: page, props }) => {
  // All routing logic is in the Page component

  if (typeof window === 'undefined') return null

  return (
    <div className={'layout'}>
      <AuthLayout {...props}>
        <PageLayout {...props}>{page}</PageLayout>
      </AuthLayout>
    </div>
  )
}

export const wrapRootElement = ({ element: root }) => {
  const alertOptions = {
    position: 'top right',
    timeout: 3000,
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
