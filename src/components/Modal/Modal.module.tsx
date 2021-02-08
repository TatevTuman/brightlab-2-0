import { LoadableComponent } from '@loadable/component'
import { withLoadableFallback } from '@hocs'
import { ModalFooter, ModalHeader } from './components'

import type { ModalProps, ModalModule } from './Modal'
type LoadableModal = LoadableComponent<ModalProps> & ModalModule

/*
  Modal module
  TODO Research. Dot notation doesn't work with hocs
*/

const Modal = withLoadableFallback<ModalProps>(import('./Modal'), {}) as LoadableModal

Modal.Header = ModalHeader
Modal.Footer = ModalFooter

export default Modal
