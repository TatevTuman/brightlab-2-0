import React from 'react'
import { SEO } from '@components'
import { Image, Link } from '@elements'
import Logo from '@images/logo.svg'

const Home: React.FC = () => {
  const logoStyles = {
    position: 'absolute' as const,
    top: 0,
    right: 0
  }

  return (
    <section>
      <SEO title={'Home'} />
      <h1>
        <mark>Brightlab</mark>
        <br />
        <strong>Gatsby</strong>
        <br />
        Boilerplate
      </h1>
      <h2>Check all features</h2>
      <Logo style={logoStyles} />
      <h3>
        <ul>
          <li>
            <Link to="/typography">Typography</Link>
          </li>
          <li>
            <a href="http://localhost:6006/" target="_blank" rel="noreferrer">
              Storybook
            </a>
            <small>
              <p className="dark-blue">- yarn storybook</p>
            </small>
          </li>
          <li>Typescript</li>
          <li>React</li>
          <li>
            Jest
            <small>
              <p className="dark-blue">- yarn test --watch</p>
            </small>
          </li>
        </ul>
      </h3>
      <Image filename={'test.png'} />
    </section>
  )
}

export default Home
