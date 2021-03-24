import React, { memo } from 'react'
import { Modal } from '@modules'
import { useModal } from '@hooks'
import './HomeModal.scss'

export interface HomeModalProps {}

const HomeModal: React.FC<HomeModalProps> = props => {
  const { modal, closeModal } = useModal('HomeModal')
  const number = modal?.state?.number

  return (
    <Modal id={'HomeModal'} opened={!!modal} onClose={closeModal} width={400}>
      <div className={'home-modal'}>
        <Modal.Header>
          <h3>Home modal</h3>
        </Modal.Header>
        <div>Random number from modal state: {number}</div>
        <Modal.Footer>
          <div onClick={closeModal}>Close</div>
        </Modal.Footer>
      </div>
    </Modal>
  )
}

export default memo(HomeModal)
