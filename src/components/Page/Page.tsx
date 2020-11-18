import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Container } from '@components'
import { useSiteMetadata } from '@hooks'
import { Children } from '@types'
import styles from './Page.module.scss'

export interface PageProps extends RouteComponentProps {
  children: Children
}

const Page: React.FC<PageProps> = props => {
  const { children, path } = props
  const { navigation } = useSiteMetadata()

  const isDynamicPage = path!.includes('/*')
  const pathWithoutSlash = path!.slice(0, isDynamicPage ? -2 : -1)
  const page = navigation.find(page => page.path === pathWithoutSlash)

  return (
    <div className={styles.page} role="main">
      <Container>{children}</Container>
    </div>
  )
}

Page.defaultProps = {
  path: ''
}

export default memo(Page)
