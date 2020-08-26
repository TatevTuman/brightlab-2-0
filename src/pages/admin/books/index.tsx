import React from 'react'
import { SEO } from '@components'
import { PageLayer, PageLayerProps, PageLayerState } from '@layers'

interface AdminBooksProps extends PageLayerProps {}
interface AdminBooksState extends PageLayerState {}

class AdminBooks extends PageLayer<AdminBooksProps, AdminBooksState> {
  state: AdminBooksState

  constructor(props: AdminBooksProps) {
    const supper = (super(props) as unknown) as PageLayer<AdminBooksProps, AdminBooksState>

    this.state = {
      ...supper.state
    }
  }

  render() {
    return this.preRender(
      <section>
        <SEO title={'AdminBooks'} />
        <h1>AdminBooks</h1>
      </section>
    )
  }
}

export default AdminBooks
