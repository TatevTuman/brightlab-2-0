import loadable from '@loadable/component'

import type { HomeModalProps } from './HomeModal/HomeModal'
const HomeModal = loadable(() => import('./HomeModal/HomeModal'))

export { HomeModal }

export type { HomeModalProps }
