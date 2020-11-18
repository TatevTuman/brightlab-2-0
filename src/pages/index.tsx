import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'
import { useModal } from '@hooks'

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = props => {
  const { openModal } = useModal('HomeModal')

  return (
    <section>
      <SEO title={'Home'} />
      <h1>
        <mark>Brightlab</mark>
        <br />
        <strong>Gatsby</strong>
        <br />
        <div onClick={() => openModal({ number: Math.random() })}>Boilerplate</div>
      </h1>
    </section>
  )
}

export default memo(Home)
