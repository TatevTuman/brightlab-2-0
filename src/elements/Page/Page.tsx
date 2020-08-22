import React, { useEffect, useState } from 'react'
import { Container } from '@components'
import './Page.scss'

interface PageProps {
  children: JSX.Element | JSX.Element[]
}

const Page: React.FC<PageProps> = props => {
  const { children } = props
  const [fixedPadding, setFixedPadding] = useState(null)

  useEffect(() => {
    const header = document.querySelector('.header')
    if (header) setFixedPadding(header.offsetHeight)
  }, [])

  return (
    <div className="page" style={{ paddingTop: fixedPadding + 'px' }}>
      <Container>{children}</Container>
    </div>
  )
}

export default Page
