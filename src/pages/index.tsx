import React, { memo, useEffect, useRef } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '@components'
import { useModal } from '@hooks'
import lottie from 'lottie-web'

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = props => {
  const { openModal } = useModal('HomeModal')
  const animationRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (animationRef && animationRef.current) {
      const animation = lottie.loadAnimation({
        container: animationRef.current! as Element,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'data.json'
      })
    }
  }, [animationRef])

  return (
    <section>
      <SEO title={'Home'} />
      <div
        ref={animationRef}
        style={{ height: '90vh', width: '100vw', paddingTop: '200px', zIndex: -1, left: 0, position: 'absolute' }}
      />
      <h1>
        <mark>Brightlab</mark>
        <br />
        <strong>Gatsby</strong>
        <br />
        <div>Boilerplate</div>
        <div onClick={() => openModal({ number: Math.random() })}>Modal</div>
      </h1>
      {/*<Calendar onDateChanged={() => null} />*/}
    </section>
  )
}

export default memo(Home)
