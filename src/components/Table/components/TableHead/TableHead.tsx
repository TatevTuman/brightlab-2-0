import React, { memo } from 'react'
import { TableColumnType } from '@types'
import './TableHead.scss'

interface TableHeadProps {
  columns: TableColumnType[]
  isRowIndex?: boolean
}

const TableHead: React.FC<TableHeadProps> = props => {
  const { columns, isRowIndex } = props

  return (
    <thead className={'table-head'}>
      <tr className={'table-head-tr'}>
        {isRowIndex && <th className={'table-head-tr-th'} data-testid={'thead-row-index'} />}
        {columns.map((column, index) => {
          return (
            <th className={'table-head-tr-th'} key={index}>
              {column.title}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default memo(TableHead)
