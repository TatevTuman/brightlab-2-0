import BaseLayer, { BaseLayerProps, BaseLayerState } from './Base'

export interface UserLayerProps extends BaseLayerProps {}
export interface UserLayerState extends BaseLayerState {
  user: boolean
}

class UserLayer<P extends UserLayerProps, S extends UserLayerState> extends BaseLayer<P, S> {
  state: S

  constructor(props: P) {
    const supper = (super(props) as unknown) as BaseLayer<P, S>

    this.state = {
      ...supper.state,
      user: true
    }
  }
}

export default UserLayer
