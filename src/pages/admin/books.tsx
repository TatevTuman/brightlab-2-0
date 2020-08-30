import React, { memo } from 'react'
import { SEO } from '@components'
import { LayersProps } from '@layers'

interface AdminBooksProps extends LayersProps {}

const AdminBooks: React.FC<AdminBooksProps> = props => {
  return (
    <section>
      <SEO title={'AdminBooks'} />
      <h1>AdminBooks</h1>
    </section>
  )
}

export default memo(AdminBooks)
