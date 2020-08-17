import React from 'react'
import { Page } from '@elements'
import '@styles/app.scss'

// eslint-disable-next-line react/display-name
export const wrapPageElement = ({ element, props }) => {
  return <Page {...props}>{element}</Page>
}

export const wrapRootElement = ({ element, props }) => {
  return <div {...props}>{element}</div>
}
