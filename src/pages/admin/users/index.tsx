import React from 'react'
import { SEO } from '@components'
import { PageLayer, PageLayerProps, PageLayerState } from '@layers'

interface AdminUsersProps extends PageLayerProps {}
interface AdminUsersState extends PageLayerState {}

class AdminUsers extends PageLayer<AdminUsersProps, AdminUsersState> {
  state: AdminUsersState

  constructor(props: AdminUsersProps) {
    const supper = (super(props) as unknown) as PageLayer<AdminUsersProps, AdminUsersState>

    this.state = {
      ...supper.state
    }
  }

  render() {
    return this.preRender(
      <section>
        <SEO title={'AdminUsers'} />
        <h1>AdminUsers</h1>
      </section>
    )
  }
}

export default AdminUsers
