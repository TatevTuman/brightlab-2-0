import loadable, { LoadableComponent } from '@loadable/component'

import { HomeDrawerProps } from './HomeDrawer/HomeDrawer'

export const HomeDrawer: LoadableComponent<HomeDrawerProps> = loadable(() => import('./HomeDrawer/HomeDrawer'))
