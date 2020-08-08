import React from 'react'
import { Container } from '@components'
import './Page.scss'

interface PageProps {
  children: JSX.Element | JSX.Element[]
}

const Page: React.FC<PageProps> = props => {
  const { children } = props

  return (
    <div className="page">
      <Container>{children}</Container>
    </div>
  )
}

export default Page
