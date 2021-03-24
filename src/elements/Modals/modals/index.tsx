import { withLoadableFallback } from '@hocs'

import type { HomeModalProps } from './HomeModal/HomeModal'
const HomeModal = withLoadableFallback<HomeModalProps>(import('./HomeModal/HomeModal'), {
  fallback: { height: '' }
})

export { HomeModal }

export type { HomeModalProps }
