import React, { memo } from 'react'
import { Navigation, Container } from '@elements'
import { useSiteMetadata } from '@hooks'
import './Footer.scss'

export interface FooterProps {}

const Footer: React.FC<FooterProps> = props => {
  const { navigation } = useSiteMetadata()

  return (
    <div className={'footer'} role="contentinfo">
      <Container>
        <Navigation navigation={navigation} />
      </Container>
    </div>
  )
}

export default memo(Footer)
