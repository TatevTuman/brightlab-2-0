import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'

interface AdminBooksProps extends RouteComponentProps {}

const AdminBooks: React.FC<AdminBooksProps> = props => {
  return (
    <section>
      <SEO title={'AdminBooks'} />
      <h1>AdminBooks</h1>
    </section>
  )
}

export default memo(AdminBooks)
