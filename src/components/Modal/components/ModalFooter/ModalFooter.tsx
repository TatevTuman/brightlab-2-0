import React, { memo } from 'react'
import { Children } from '@types'
import '../../Modal.scss'

export interface ModalFooterProps {
  children: Children
}

type ModalFooterType = React.FC<ModalFooterProps>

const ModalFooter: ModalFooterType = props => {
  return <footer className={'modal-footer'}>{props.children}</footer>
}

export default memo(ModalFooter)
