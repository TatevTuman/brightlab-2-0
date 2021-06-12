import React, { memo } from 'react'
import { PageMeta } from '~seo'

const NotFoundPage = () => {
  return (
    <section>
      <PageMeta title="404: Not found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </section>
  )
}

export default memo(NotFoundPage)
