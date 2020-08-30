import React, { memo } from 'react'
import { SEO } from '@components'
import { LayersProps } from '@layers'

interface AdminUsersProps extends LayersProps {}

const AdminUsers: React.FC<AdminUsersProps> = props => {
  return (
    <section>
      <SEO title={'AdminUsers'} />
      <h1>AdminUsers</h1>
    </section>
  )
}

export default memo(AdminUsers)
