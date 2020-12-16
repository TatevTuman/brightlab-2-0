import React, { memo } from 'react'
import { TableColumnType, TableRowType } from '@types'
import { handleEvent } from '@utils'
import styles from './TableBody.module.scss'

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
    <td className={'table-body-tr-td'} key={index} style={{ width: '20px' }} data-testid={'tbody-row-index'}>
      <div className={'table-body-tr-td__inner'}>{++index}.</div>
    </td>
  )
}

const TableBody: React.FC<TableBodyProps> = props => {
  const { columns, rows, filters, handleRowClick, isRowIndex } = props

  const renderFunctions = columns.map(column => column.render)
  const filteredRows = filters
    ? rows.filter((row: TableRowType) => {
        return filters.every(filter => {
          const { handleFilter, field } = filter
          return handleFilter(row[field])
        })
      })
    : rows

  return (
    <tbody className={styles.tableBody}>
      {filteredRows.map((row: TableRowType, index) => {
        const cells = columns

        return (
          <tr
            className={'table-body-tr'}
            key={index}
            data-disabled={row.disabled}
            onClick={() => handleEvent(handleRowClick, { value: row, disabled: row.disabled })}
          >
            {isRowIndex && <TableBodyRowIndex index={index} />}
            {cells.map((cell, index) => {
              const { key, style } = cell
              const isOption = typeof row[key] === 'object'

              const renderFunction = renderFunctions[index]
              const render = renderFunction
                ? renderFunction(row[key], row)
                : isOption
                ? row[key] && row[key].label
                : row[key]

              return (
                <td className={'table-body-tr-td'} key={index} style={style}>
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
