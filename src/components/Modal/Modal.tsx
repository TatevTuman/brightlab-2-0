import React, { memo } from 'react'
import { createPortal } from 'react-dom'
import { ModalHeader, ModalFooter, ModalFooterProps, ModalHeaderProps } from './components'
import { Children } from '@types'
import { useModal } from '@hooks'
import './Modal.scss'

export interface ModalProps {
  modalName: string
  children: Children
}

export type ModalType = React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>
  Footer: React.FC<ModalFooterProps>
}

const Modal: ModalType = props => {
  const { modalName, children } = props
  const { modal: isModalOpened, closeModal } = useModal(modalName)
  const container = document.getElementById('modals')

  if (!isModalOpened) return null

  const ModalComponent = memo(() => {
    return (
      <div id={modalName} className={'modal'} role={'complementary'}>
        <div className={'modal-mask'} onClick={closeModal} />
        <div className={'modal-content'}>{children}</div>
      </div>
    )
  })

  ModalComponent.displayName = modalName

  return createPortal(<ModalComponent />, container!)
}

Modal.Footer = ModalFooter
Modal.Header = ModalHeader

export default Modal
