import React, { memo } from 'react'
import { Children } from '@types'
import '../../Modal.scss'

export interface ModalFooterProps {
  children: Children
}

const ModalFooter: React.FC<ModalFooterProps> = props => {
  return <footer className={'modal-footer'}>{props.children}</footer>
}

export default memo(ModalFooter)
