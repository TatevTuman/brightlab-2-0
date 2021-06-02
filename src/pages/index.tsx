import React, { memo } from 'react'
import { Seo } from '~components'

const IndexPage = () => {
  return (
    <section className="bg-white pt-20">
      <Seo title={'Home'} />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <h1 className="tracking-tight text-black-1000">
          <span className="block">Ready to dive in?</span>
          <span className="block text-green-600">Welcome to the Gatsby Boilerplate for Brightlab!</span>
        </h1>
        <div className="mt-8 flex">
          <button className="btn btn-green">Get started</button>
          <div className="btn btn-green-white ml-10">Learn more</div>
        </div>
      </div>
    </section>
  )
}

export default memo(IndexPage)
