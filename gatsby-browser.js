import React from 'react'
import { ApolloProvider } from '@apollo/client'
import ApolloClient from './apollo'
import { Header } from '@components'
import { Page } from '@elements'
import { BaseLayer, AuthLayer, PageLayer } from '@layers'
import '@styles/app.scss'

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element, props: routerProps }) => {
  // We are going through layers and collect common props and methods
  return (
    <Page>
      <BaseLayer {...routerProps}>
        {({ client, ...baseLayer }) => {
          return (
            <AuthLayer client={client}>
              {authLayer => {
                return (
                  <PageLayer client={client}>
                    {pageLayer => {
                      const { baseMethods, state: baseState, props: baseProps } = baseLayer
                      const { authMethods, state: authState, props: authProps } = authLayer
                      const { pageMethods, state: pageState, props: pageProps } = pageLayer

                      const layersProps = { ...baseProps, ...authProps, ...pageProps }
                      const layersState = { ...baseState, ...authState, ...pageState }

                      const props = {
                        baseMethods,
                        authMethods,
                        pageMethods,
                        ...layersProps,
                        ...layersState
                      }

                      return React.createElement(element.type, props)
                    }}
                  </PageLayer>
                )
              }}
            </AuthLayer>
          )
        }}
      </BaseLayer>
    </Page>
  )
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
