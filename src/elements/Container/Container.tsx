import React, { memo } from 'react'
import { Children } from '@types'

export interface ContainerProps {
  children: Children
}

const Container: React.FC<ContainerProps> = props => {
  const { children } = props

  return <div className={'container'}>{children}</div>
}

export default memo(Container)
