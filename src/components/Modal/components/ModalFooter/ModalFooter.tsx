import React, { memo } from 'react'
import { Children } from '@types'
import styles from '../../Modal.module.scss'

export interface ModalFooterProps {
  children: Children
}

type ModalFooterType = React.FC<ModalFooterProps>

const ModalFooter: ModalFooterType = props => {
  return <footer className={styles.modalFooter}>{props.children}</footer>
}

export default memo(ModalFooter)
