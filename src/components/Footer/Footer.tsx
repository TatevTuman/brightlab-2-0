import React, { memo } from 'react'
import { Container } from '@components'
import { Navigation } from '@elements'
import { useSiteMetadata } from '@hooks'
import styles from './Footer.module.scss'

export interface FooterProps {}

const Footer: React.FC<FooterProps> = props => {
  const { navigation } = useSiteMetadata()

  return (
    <div className={styles.footer} role="contentinfo">
      <Container>
        <Navigation navigation={navigation} />
      </Container>
    </div>
  )
}

export default memo(Footer)
