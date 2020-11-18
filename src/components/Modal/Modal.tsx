import React, { memo } from 'react'
import { createPortal } from 'react-dom'
import { ModalHeader, ModalFooter, ModalFooterProps, ModalHeaderProps } from './components'
import { Children } from '@types'
import { useModal } from '@hooks'
import styles from './Modal.module.scss'

export interface ModalProps {
  modalName: string
  children: Children
}

type ModalType = React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>
  Footer: React.FC<ModalFooterProps>
}

const Modal: ModalType = props => {
  const { modalName, children } = props
  const { modal, closeModal } = useModal(modalName)
  const container = document.getElementById('modals')

  const isModalOpened = !!modal

  const ModalComponent = memo(() => {
    return (
      <div className={styles.modal} role={'complementary'}>
        <div className={styles.modalMask} onClick={() => closeModal()} />
        <div className={styles.modalContent}>{children}</div>
      </div>
    )
  })

  ModalComponent.displayName = modalName

  if (isModalOpened) {
    return createPortal(<ModalComponent />, container!)
  }

  return null
}

Modal.Footer = memo(ModalFooter)
Modal.Header = memo(ModalHeader)

export default Modal
