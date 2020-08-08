import React from 'react'
import { Container, SEO } from '@components'
import './Page.scss'

interface PageProps {
  name: string
  children: JSX.Element | JSX.Element[]
}

const Page: React.FC<PageProps> = props => {
  const { name, children } = props

  return (
    <section className="page" data-name={name}>
      <SEO title={name} />
      <Container>{children}</Container>
    </section>
  )
}

export default Page
