import React, { memo } from 'react'
import { Container } from '@components'
import { Navigation } from '@elements'
import { useSiteMetadata, useWindowSize } from '@hooks'
import LogoImage from '@images/logo.svg'
import './Header.scss'

const HomeLogo = () => {
  const { toRender } = useWindowSize(['desktop'])
  if (!toRender) return null

  const logoStyles = {
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
