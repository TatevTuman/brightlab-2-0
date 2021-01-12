import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO, Calendar } from '@components'
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
        <div>Boilerplate</div>
        <div onClick={() => openModal({ number: Math.random() })}>Modal</div>
      </h1>
      <Calendar onDateChanged={() => null} />
    </section>
  )
}

export default memo(Home)
