import React, { memo, useState } from 'react'
import { ApolloClient, ApolloConsumer } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'

export interface BaseLayerMethods {}
export interface BaseLayerState {
  base: boolean
}
export interface BaseLayerProps extends RouteComponentProps {
  children(base: {
    state: BaseLayerState
    props: Omit<BaseLayerProps, 'children'>
    baseMethods: BaseLayerMethods
    client: ApolloClient<Record<string, any>>
  }): JSX.Element | JSX.Element[]
}

const BaseLayer: React.FC<BaseLayerProps> = props => {
  const { children, ...otherProps } = props
  const [state, setState] = useState<BaseLayerState>({ base: true })

  const baseMethods: BaseLayerMethods = {}

  return (
    <ApolloConsumer>
      {client => {
        return <>{children({ state, props: otherProps, baseMethods, client })}</>
      }}
    </ApolloConsumer>
  )
}

export default memo(BaseLayer)
