import { PageProps } from 'gatsby'
import React, { memo } from 'react'

interface PageLayoutProps extends PageProps {}

const PageLayout: React.FC<PageLayoutProps> = props => {
  const { children } = props

  return (
    <main className="flex-1">
      <div className="container">{children}</div>
    </main>
  )
}

export default memo(PageLayout)
