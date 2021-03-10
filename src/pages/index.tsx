import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = props => {
  return (
    <section>
      <SEO title={'Home'} />
      <h1>
        <mark>Brightlab</mark>
        <br />
        <strong>Gatsby</strong>
        <br />
        <div>Boilerplate</div>
      </h1>
    </section>
  )
}

export default memo(Home)
