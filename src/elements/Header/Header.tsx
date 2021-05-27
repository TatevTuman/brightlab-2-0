import React, { memo } from 'react'
import { Container } from '@elements'
import { useSiteMetadata } from '@hooks'

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const { navigation } = useSiteMetadata()

  return (
    <div className={'header'}>
      <Container>
        <h1>Header</h1>
      </Container>
    </div>
  )
}

export default memo(Header)
