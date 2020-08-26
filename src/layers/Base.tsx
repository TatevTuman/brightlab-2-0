import { PureComponent } from 'react'

export interface BaseLayerProps {}
export interface BaseLayerState {}

class BaseLayer<P extends BaseLayerProps, S extends BaseLayerState> extends PureComponent<P, S> {
  state: S

  constructor(props: P) {
    const supper = (super(props) as unknown) as PureComponent<P, S>

    this.state = {
      ...supper.state
    }
  }

  preRender(children: JSX.Element) {
    return children
  }
}

export default BaseLayer
