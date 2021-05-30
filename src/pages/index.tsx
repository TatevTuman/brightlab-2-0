import React, { memo } from "react"
import { Seo } from "@components"

const IndexPage = () => {
  return (
    <section>
      <Seo title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
    </section>
  )
}

export default memo(IndexPage)
