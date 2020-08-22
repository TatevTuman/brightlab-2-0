import React from 'react'
import UserLayer, { UserLayerProps, UserLayerState } from './User'

export interface PageLayerProps extends UserLayerProps {}
export interface PageLayerState extends UserLayerState {
  page: boolean
}

class PageLayer<P extends PageLayerProps, S extends PageLayerState> extends UserLayer<PageLayerProps, PageLayerState> {
  state: PageLayerState

  constructor(props: PageLayerProps) {
    const supper = (super(props) as unknown) as UserLayer<PageLayerProps, PageLayerState>

    this.state = {
      ...supper.state,
      page: true
    }
  }

  preRender(children: JSX.Element) {
    return super.preRender(children)
  }
}

export default PageLayer
