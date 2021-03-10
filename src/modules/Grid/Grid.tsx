import React from 'react'
import { useWindowSize } from '@hooks'
import { ShortBreakpointName, GridItemsAlign, GridContentAlign, GridAutoFlow } from '@types'
import './Grid.scss'

export type GridTemplate = {
  cols: string
  rows: string
  gap: string
  gridAutoColumns?: string
  gridAutoRows?: string
  gridAutoFlow?: GridAutoFlow
  justifyItems?: GridItemsAlign
  alignItems?: GridItemsAlign
  justifyContent?: GridContentAlign
  alignContent?: GridContentAlign
}

export type GridProps = {
  [x in ShortBreakpointName]?: GridTemplate
} & {
  xs: GridTemplate
}

const Grid: React.FC<GridProps> = props => {
  const { children } = props

  const { breakpoint } = useWindowSize({ shortBreakpoints: true })
  const gridMediaSettings = props[breakpoint as ShortBreakpointName] || props.xs

  const gridMediaStyles = {
    gridTemplateColumns: gridMediaSettings.cols,
    gridTemplateRows: gridMediaSettings.rows,
    gridGap: gridMediaSettings.gap,
    gridAutoColumns: gridMediaSettings.gridAutoColumns,
    gridAutoRows: gridMediaSettings.gridAutoRows,
    gridAutoFlow: gridMediaSettings.gridAutoFlow,
    justifyItems: gridMediaSettings.justifyItems,
    alignItems: gridMediaSettings.alignItems,
    justifyContent: gridMediaSettings.justifyContent,
    alignContent: gridMediaSettings.alignContent
  }

  return (
    <div className={'grid'} style={gridMediaStyles}>
      {children}
    </div>
  )
}

Grid.defaultProps = {}

export default Grid
