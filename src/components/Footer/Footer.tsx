import React, { memo } from 'react'
import { Container } from '@components'
import { Link } from '@elements'
import { useSiteMetadata } from '@hooks'
import styles from './Footer.module.scss'

interface HeaderProps {}

const Footer: React.FC<HeaderProps> = props => {
  const { navigation } = useSiteMetadata()

  return (
    <div className={styles.footer} role="contentinfo">
      <Container>
        <nav role={'navigation'} data-direction={'vertical'}>
          {navigation.map(item => {
            const { path, label } = item

            return (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            )
          })}
        </nav>
      </Container>
    </div>
  )
}

export default memo(Footer)
