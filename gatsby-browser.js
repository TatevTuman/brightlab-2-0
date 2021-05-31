/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"
import { ApolloProvider } from "@apollo/client"
import { Provider as AlertProvider, transitions } from "react-alert"
import { Page, Header, Footer } from "~components"
import { Alert } from "~elements"
import client from "./gatsby-apollo"
import "~styles/app.css"

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element, props }) => {
  // All routing logic is in the Page component

  return (
    <div className="flex flex-col min-h-100vh">
      <Header />
      <Page {...props}>{element}</Page>
      <Footer />
    </div>
  )
}

export const wrapRootElement = ({ element }) => {
  const alertOptions = {
    position: "top right",
    timeout: 2000,
    offset: "25px 30px -10px",
    transition: transitions.SCALE,
  }

  return (
    <ApolloProvider client={client}>
      <AlertProvider template={Alert} {...alertOptions}>
        {element}
      </AlertProvider>
    </ApolloProvider>
  )
}
