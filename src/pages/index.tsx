import React, { memo } from 'react'
import { PageMeta } from '~seo'
import { Button } from '~ui'

const IndexPage = () => {
  return (
    <section className="bg-white pt-20">
      <PageMeta title={'Home'} />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <h1 className="tracking-tight text-neutral-9">
          <span className="block">Ready to dive in?</span>
          <span className="block">Welcome to the Gatsby Boilerplate for Brightlab!</span>
        </h1>
        <div className="mt-8 flex">
          <Button>Get started</Button>
          <Button variant="primary">Learn more</Button>
        </div>
      </div>
    </section>
  )
}

export default memo(IndexPage)
