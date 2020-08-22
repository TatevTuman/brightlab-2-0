import React from 'react'
import { SEO } from '@components'
import { PageLayer, PageLayerProps, PageLayerState } from '@layers'

interface UsersProps extends PageLayerProps {}

interface UsersState extends PageLayerState {}

class Users extends PageLayer<UsersProps, UsersState> {
  state: UsersState

  constructor(props: UsersProps) {
    const supper = (super(props) as unknown) as PageLayer<UsersProps, UsersState>

    this.state = {
      ...supper.state
    }
  }

  render() {
    return this.preRender(
      <section>
        <SEO title={'Users'} />
        <h1>Users</h1>
      </section>
    )
  }
}

export default Users
