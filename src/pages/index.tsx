import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'
import { useModal, useDrawer } from '@hooks'

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = props => {
  const { openModal } = useModal('HomeModal')
  // const { openDrawer } = useDrawer('HomeDrawer')

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
        {/*<div onClick={openDrawer}>Drawer</div>*/}
      </h1>
    </section>
  )
}

export default memo(Home)
