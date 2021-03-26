import React, { memo } from 'react'
import { Container } from '@elements'
import { Navigation } from '@elements'
import { useSiteMetadata, useWindowSize } from '@hooks'
import LogoImage from '@images/test.png'
import './Header.scss'

const HomeLogo = () => {
  const { toRender } = useWindowSize(['desktop'])
  if (!toRender) return null

  const logoStyles = {
    width: '100px',
    position: 'absolute' as const,
    top: 0,
    right: 0
  }

  return <LogoImage width={100} height={100} style={logoStyles} />
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
