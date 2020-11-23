import React, { memo } from 'react'
import { Container } from '@components'
import { Link } from '@elements'
import { useSiteMetadata, useWindowSize } from '@hooks'
import styles from './Header.module.scss'
import LogoImage from '@images/logo.svg'

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
    <div className={styles.header}>
      <Container>
        <HomeLogo />
        <nav role={'navigation'} data-direction="horizontal">
          <ul>
            {navigation.map(item => {
              const { path, label } = item

              return (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </Container>
    </div>
  )
}

export default memo(Header)
