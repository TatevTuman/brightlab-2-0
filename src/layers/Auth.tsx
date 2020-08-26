import BaseLayer, { BaseLayerProps, BaseLayerState } from './Base'

export interface AuthLayerProps extends BaseLayerProps {}
export interface AuthLayerState extends BaseLayerState {}

class AuthLayer<P extends AuthLayerProps, S extends AuthLayerState> extends BaseLayer<P, S> {
  state: S

  constructor(props: P) {
    const supper = (super(props) as unknown) as BaseLayer<P, S>

    this.state = {
      ...supper.state
    }
  }

  preRender(children: JSX.Element) {
    return super.preRender(children)
  }
}

export default AuthLayer
