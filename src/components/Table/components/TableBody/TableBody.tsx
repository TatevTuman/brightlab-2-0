import React, { memo } from 'react'
import { TableColumnType, TableRowType } from '@types'
import './TableBody.scss'

interface TableBodyProps {
  columns: TableColumnType[]
  rows: TableRowType[]
  filters?: { field: string; handleFilter: (...args: any) => boolean }[]
  handleRowClick?: (row: TableRowType) => void
  isRowIndex?: boolean
}

const TableBodyRowIndex: React.FC<{ index: number }> = props => {
  let { index } = props

  return (
    <td className={'table-body-tr-td'} key={index} style={{ width: '20px' }}>
      <div className={'table-body-tr-td__inner'}>{++index}.</div>
    </td>
  )
}

const TableBody: React.FC<TableBodyProps> = props => {
  const { columns, rows, filters, handleRowClick, isRowIndex } = props

  const renderFunctions = columns.map(column => column.render)
  const filteredRows = filters
    ? rows.filter((row: any) => {
        return filters.every(filter => {
          const { handleFilter, field } = filter
          return handleFilter(row[field])
        })
      })
    : rows

  return (
    <tbody className={'table-body'}>
      {filteredRows.map((row: any, index) => {
        const cells = columns.map(column => ({ dataIndex: column.dataIndex, width: column.width || 'unset' }))

        return (
          <tr
            className={'table-body-tr'}
            key={index}
            data-disabled={row.status === 'Inactive'}
            onClick={() => handleRowClick && handleRowClick(row)}
          >
            {isRowIndex && <TableBodyRowIndex index={index} />}
            {cells.map((cell, index) => {
              const { dataIndex, width } = cell
              const isOption = typeof row[dataIndex] === 'object'

              const renderFunction = renderFunctions[index]
              const render = renderFunction
                ? renderFunction(row[dataIndex], row)
                : isOption
                ? row[dataIndex] && row[dataIndex].label
                : row[dataIndex]

              return (
                <td className={'table-body-tr-td'} key={index} style={{ width }}>
                  <div className={'table-body-tr-td__inner'}>{render}</div>
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

export default memo(TableBody)
