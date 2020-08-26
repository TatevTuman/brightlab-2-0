import AuthLayer, { AuthLayerProps, AuthLayerState } from './Auth'

export interface PageLayerProps extends AuthLayerProps {}
export interface PageLayerState extends AuthLayerState {}

class PageLayer<P extends PageLayerProps, S extends PageLayerState> extends AuthLayer<PageLayerProps, PageLayerState> {
  state: PageLayerState

  constructor(props: PageLayerProps) {
    const supper = (super(props) as unknown) as AuthLayer<PageLayerProps, PageLayerState>

    this.state = {
      ...supper.state
    }
  }

  preRender(children: JSX.Element) {
    return super.preRender(children)
  }
}

export default PageLayer
