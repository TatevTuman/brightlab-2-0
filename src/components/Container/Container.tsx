import React, { memo } from 'react'
import './Container.scss'

interface ContainerProps {
  children: JSX.Element | JSX.Element[]
}

const Container: React.FC<ContainerProps> = props => {
  const { children } = props

  return <div className="container">{children}</div>
}

export default memo(Container)
