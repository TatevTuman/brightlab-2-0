import React, { memo } from "react"
import { Seo } from "~components"

const NotFoundPage = () => {
  return (
    <section>
      <Seo title="404: Not found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </section>
  )
}

export default memo(NotFoundPage)
