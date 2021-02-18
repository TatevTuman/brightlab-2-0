import loadable, { LoadableComponent } from '@loadable/component'
import { withLoadableFallback } from '@hocs'
import { ModalFooter, ModalHeader } from './components'

import type { ModalProps } from './Modal'

export type ModalModule = {
  Footer: typeof ModalHeader
  Header: typeof ModalFooter
}
export type LoadableModal = LoadableComponent<ModalProps> & ModalModule

/*
  Modal module
  TODO Research. Dot notation doesn't work with hocs
*/

const Modal = loadable(() => import('./Modal')) as LoadableModal

Modal.Header = ModalHeader
Modal.Footer = ModalFooter

export default Modal
