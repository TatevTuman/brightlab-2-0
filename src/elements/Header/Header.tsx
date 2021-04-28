import React, { memo } from 'react'
import { Navigation, Container } from '@elements'
import { useSiteMetadata } from '@hooks'
import './Header.scss'

const HomeLogo = () => {
  return null
}

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const { navigation } = useSiteMetadata()

  return (
    <div className={'header'}>
      <Container>
        <HomeLogo />
        <Navigation navigation={navigation} activeMatch />
      </Container>
    </div>
  )
}

export default memo(Header)
