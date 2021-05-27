import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'
import { HomeTest } from '@pages-components/home'

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = props => {
  return (
    <section>
      <SEO title={'Home'} />
      <HomeTest />
      <h1>
        <mark className={'text-20'}>Brightlab</mark>
        <br />
        <strong>Gatsby</strong>
        <br />
        <div>Boilerplate</div>
      </h1>
    </section>
  )
}

export default memo(Home)
