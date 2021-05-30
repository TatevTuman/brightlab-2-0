import { PageProps } from "gatsby"
import React, { memo } from "react"

interface PageComponentProps extends PageProps {}

const Page: React.FC<PageComponentProps> = props => {
  const { children } = props

  return <main className="">{children}</main>
}

export default memo(Page)
