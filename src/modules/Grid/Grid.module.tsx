import loadable, { LoadableComponent } from '@loadable/component'
import { GridCell } from './components'

import type { GridProps } from './Grid'

export type GridModule = {
  Cell: typeof GridCell
}
export type LoadableGrid = LoadableComponent<GridProps> & GridModule

/*
  Grid module
  TODO Research. Dot notation doesn't work with hocs
*/

const Grid = loadable(() => import('./Grid')) as LoadableGrid

Grid.Cell = GridCell

export default Grid
