import React, { memo } from 'react'
import styles from './Container.module.scss'

interface ContainerProps {
  children: JSX.Element | JSX.Element[] | string
}

const Container: React.FC<ContainerProps> = props => {
  const { children } = props

  return <div className={styles.container}>{children}</div>
}

export default memo(Container)
