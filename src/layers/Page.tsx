import React, { memo, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { ApolloClient } from '@apollo/client'

export interface PageLayerMethods {}
export interface PageLayerState {
  page: boolean
}
export interface PageLayerProps extends RouteComponentProps {
  client: ApolloClient<Record<string, any>>
  children(page: {
    state: PageLayerState
    props: Omit<PageLayerProps, 'children' | 'client'>
    pageMethods: PageLayerMethods
  }): JSX.Element | JSX.Element[]
}

const PageLayer: React.FC<PageLayerProps> = props => {
  const { children, client, ...otherProps } = props
  const [state, setState] = useState<PageLayerState>({ page: true })

  const pageMethods: PageLayerMethods = {}

  return <>{children({ state, props: otherProps, pageMethods })}</>
}

export default memo(PageLayer)
