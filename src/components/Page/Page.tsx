import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Container } from '@components'
import { useSiteMetadata } from '@hooks'
import './Page.scss'

interface PageProps extends RouteComponentProps {
  children: JSX.Element | JSX.Element[]
}

const Page: React.FC<PageProps> = props => {
  const { children, path } = props
  const { navigation } = useSiteMetadata()

  const isDynamicPage = path!.includes('/*')
  const pathWithoutSlash = path!.slice(0, isDynamicPage ? -2 : -1)
  const page = navigation.find(page => page.path === pathWithoutSlash)

  return (
    <div className="page">
      <Container>{children}</Container>
    </div>
  )
}

Page.defaultProps = {
  path: ''
}

export default memo(Page)
