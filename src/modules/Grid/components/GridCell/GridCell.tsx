import React from 'react'
import { CssItemsStyle } from '@types'
import '../../Grid.scss'

interface GridCellProps {
  gridArea?: string
  gridRow?: string
  gridColumn?: string
  justifySelf?: CssItemsStyle
  alignSelf?: CssItemsStyle
}

const GridCell: React.FC<GridCellProps> = props => {
  const { children, gridArea, gridColumn, gridRow, justifySelf, alignSelf } = props

  return (
    <div className={'grid-cell'} style={{ gridArea, gridColumn, gridRow, justifySelf, alignSelf }}>
      {children}
    </div>
  )
}

export default GridCell
