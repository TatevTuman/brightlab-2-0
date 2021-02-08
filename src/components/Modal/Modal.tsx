import React from 'react'
import { ModalHeader, ModalFooter } from './components'
import { Children } from '@types'
import './Modal.scss'

export interface ModalProps {
  id: string
  opened: boolean
  width?: number
  height?: number
  onClose: () => void
  children: Children
  customContent?: boolean
}

export type ModalModule = {
  Footer: typeof ModalHeader
  Header: typeof ModalFooter
}

const Modal = (props: ModalProps) => {
  const { id, opened, children, onClose, customContent } = props

  if (!opened) return null

  const width = props.width ? props.width / 16 + 'rem' : 'fit-content'
  const height = props.height ? props.height / 16 + 'rem' : 'fit-content'

  return (
    <div id={id} className={'modal'} role={'complementary'} data-opened={opened}>
      <div className={'modal-mask'} onClick={onClose} />
      {customContent ? (
        children
      ) : (
        <div className={'modal-content'} style={{ width, height }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Modal
