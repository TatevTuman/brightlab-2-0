import React from 'react'
import { ModalHeader, ModalFooter, ModalFooterType, ModalHeaderType } from './components'
import { Children } from '@types'
import './Modal.scss'

export interface ModalProps {
  id: string
  opened: boolean
  onClose: () => void
  children: Children
}

export type ModalType = React.FC<ModalProps> & {
  Footer: ModalFooterType
  Header: ModalHeaderType
}

const Modal: ModalType = props => {
  const { id, opened, children, onClose } = props

  if (!opened) return null

  return (
    <div id={id} className={'modal'} role={'complementary'}>
      <div className={'modal-mask'} onClick={onClose} />
      <div className={'modal-content'}>{children}</div>
    </div>
  )
}

Modal.Footer = ModalFooter
Modal.Header = ModalHeader

export default Modal
