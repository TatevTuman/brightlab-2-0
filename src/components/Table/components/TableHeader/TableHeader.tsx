import React, { memo } from 'react'
import { TableColumnType } from '@types'
import './TableHeader.scss'

interface TableHeaderProps {
  columns: TableColumnType[]
  isRowIndex?: boolean
}

const TableHeader: React.FC<TableHeaderProps> = props => {
  const { columns, isRowIndex } = props

  return (
    <thead className={'table-head'}>
      <tr className={'table-head-tr'}>
        {isRowIndex && <td className={'table-head-tr-td'} />}
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

export default memo(TableHeader)
