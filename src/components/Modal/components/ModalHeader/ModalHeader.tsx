import React, { memo } from 'react'
import { Children } from '@types'
import '../../Modal.scss'

export interface ModalHeaderProps {
  children: Children
}

export type ModalHeaderType = React.FC<ModalHeaderProps>

const ModalHeader: ModalHeaderType = props => {
  return <header className={'modal-header'}>{props.children}</header>
}

export default memo(ModalHeader)
