import loadable, { LoadableComponent } from '@loadable/component'

import { HomeModalProps } from './HomeModal/HomeModal'

export const HomeModal: LoadableComponent<HomeModalProps> = loadable(() => import('./HomeModal/HomeModal'))
