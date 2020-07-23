import React from 'react'
import { Container } from '@components'
import { Link } from '@elements'

const Home: React.FC = () => {
  return (
    <section>
      <Container>
        <h1>This is Brightlab Gatsby boilerplate</h1>
        <Link to="/ui">Check UI</Link>
      </Container>
    </section>
  )
}

export default Home
