import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useQuery } from '@apollo/client'
import { SEO } from '@components'
import { useModal } from '@hooks'
import { GolfClubModel } from '@types'
import { golfClubModel } from '@graphql'

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = props => {
  const { data, loading, error } = useQuery<GolfClubModel[]>(golfClubModel.FetchAll)
  const { openModal } = useModal('HomeModal')

  console.log('data', data)

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
      <ul>
        <li>Сделать инпут для телефона</li>
        <li>Сделать lazy load с пагинацией</li>
        <li>
          <del>Починить loading submit-а в форме</del>
        </li>
        <li>Introspection fragment matcher</li>
      </ul>
    </section>
  )
}

export default memo(Home)
