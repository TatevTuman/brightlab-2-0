import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'

interface AdminUsersProps extends RouteComponentProps {}

const AdminUsers: React.FC<AdminUsersProps> = props => {
  return (
    <section>
      <SEO title={'AdminUsers'} />
      <h1>AdminUsers</h1>
    </section>
  )
}

export default memo(AdminUsers)
