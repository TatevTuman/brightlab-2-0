import React, { memo } from 'react'
import { Children } from '@types'
import styles from './Container.module.scss'

interface ContainerProps {
  children: Children
}

const Container: React.FC<ContainerProps> = props => {
  const { children } = props

  return <div className={styles.container}>{children}</div>
}

export default memo(Container)
