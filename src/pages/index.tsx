import React from 'react'
import { Container } from '@components'
import { Link } from '@elements'

const Home: React.FC = () => {
  return (
    <section>
      <Container>
        <h1>
          <mark>Brightlab</mark>
          <br />
          <strong>Gatsby</strong>
          <br />
          Boilerplate
        </h1>
        <h2>Check all features</h2>
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
      </Container>
    </section>
  )
}

export default Home
