import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Container } from '@components'
import { Children } from '@types'
import './Page.scss'

export interface PageProps extends RouteComponentProps {
  children: Children
}

const Page: React.FC<PageProps> = props => {
  const { children } = props

  return (
    <div className={'page'} role="main">
      <Container>{children}</Container>
    </div>
  )
}

Page.defaultProps = {
  path: ''
}

export default memo(Page)
