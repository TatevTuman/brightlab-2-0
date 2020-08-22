import React from 'react'
import { SEO } from '@components'
import { PageLayer, PageLayerProps, PageLayerState } from '@layers'

interface SignInProps extends PageLayerProps {}

interface SignInState extends PageLayerState {}

class SignIn extends PageLayer<SignInProps, SignInState> {
  state: SignInState

  constructor(props: SignInProps) {
    const supper = (super(props) as unknown) as PageLayer<SignInProps, SignInState>

    this.state = {
      ...supper.state
    }
  }

  render() {
    return this.preRender(
      <section>
        <SEO title={'SignIn'} />
        <h1>SignIn</h1>
      </section>
    )
  }
}

export default SignIn
