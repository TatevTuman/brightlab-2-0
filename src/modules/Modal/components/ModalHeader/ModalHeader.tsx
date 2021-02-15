import React, { memo } from 'react'
import { Children } from '@types'
import '../../Modal.scss'

export interface ModalHeaderProps {
  children: Children
}

const ModalHeader: React.FC<ModalHeaderProps> = props => {
  return <header className={'modal-header'}>{props.children}</header>
}

export default memo(ModalHeader)
