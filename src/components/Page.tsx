import { PageProps } from 'gatsby'
import React, { memo } from 'react'

interface PageComponentProps extends PageProps {}

const Page: React.FC<PageComponentProps> = props => {
  const { children } = props

  return (
    <main className="flex-1">
      <div className="container">{children}</div>
    </main>
  )
}

export default memo(Page)
