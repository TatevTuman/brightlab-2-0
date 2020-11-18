import React, { memo } from 'react'
import { Children } from '@types'
import styles from '../../Modal.module.scss'

export interface ModalHeaderProps {
  children: Children
}

type ModalHeaderType = React.FC<ModalHeaderProps>

const ModalHeader: ModalHeaderType = props => {
  return <header className={styles.modalHeader}>{props.children}</header>
}

export default memo(ModalHeader)
