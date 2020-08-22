import React, { PureComponent } from 'react'

export interface BaseLayerProps {}
export interface BaseLayerState {
  base: boolean
}

class BaseLayer<P extends BaseLayerProps, S extends BaseLayerState> extends PureComponent<P, S> {
  state: S

  constructor(props: P) {
    const supper = (super(props) as unknown) as PureComponent<P, S>

    this.state = {
      ...supper.state,
      base: true
    }
  }

  preRender(children: JSX.Element) {
    return children
  }
}

export default BaseLayer
