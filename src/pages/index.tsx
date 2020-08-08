import React from 'react'
import { Page, Link } from '@elements'
import Logo from '@images/logo.svg'

const Home: React.FC = () => {
  return (
    <Page name="Home">
      <h1>
        <mark>Brightlab</mark>
        <br />
        <strong>Gatsby</strong>
        <br />
        Boilerplate
      </h1>
      <h2>Check all features</h2>
      <Logo className={'logo'} />
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
    </Page>
  )
}

export default Home
