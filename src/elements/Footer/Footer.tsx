import React, { memo } from 'react'
import { Container } from '@elements'
import { useSiteMetadata } from '@hooks'

export interface FooterProps {}

const Footer: React.FC<FooterProps> = props => {
  const { navigation } = useSiteMetadata()

  return (
    <div className={'footer'} role="contentinfo">
      <Container>
        <h2>Footer</h2>
      </Container>
    </div>
  )
}

export default memo(Footer)
