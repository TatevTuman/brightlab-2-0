import React, { memo, useEffect, useRef } from 'react'
import cls from 'classnames'
import { TableColumnType, TableRowType } from '~ui'
import { get } from 'lodash'
import { useWindowSize } from '~hooks'
import { ClassName } from '~types'

export interface TableBodyProps {
  className?: ClassName
  columns: TableColumnType[]
  rows: TableRowType[]
  filters?: { field: string; handleFilter: (...args: any) => boolean }[]
  handleRowClick?: (row: TableRowType) => void
}

/*const TableBodyRowIndex: React.FC<{ index: number }> = props => {
  let { index } = props

  return (
    <td className={'table-body-tr-td'} key={index} style={{ width: '20px' }} data-testid={'tbody-row-index'}>
      <div className={'table-body-tr-td__inner'}>{++index}.</div>
    </td>
  )
}*/

const TableBody: React.FC<TableBodyProps> = props => {
  const { className, columns, rows, filters, handleRowClick } = props

  const windowSize = useWindowSize()
  const tableBodyRef = useRef<HTMLTableSectionElement | null>(null)

  useEffect(() => {
    const { current: tableBody } = tableBodyRef

    if (tableBody) {
      const windowHeight = window.innerHeight
      const { y } = tableBody.getBoundingClientRect()
      const tableBodyHeight = windowHeight - y

      tableBody.style.height = tableBodyHeight + 'px'
    }
  }, [tableBodyRef, windowSize])

  const filteredRows = filters
    ? rows.filter((row: TableRowType) => {
        return filters.every(filter => {
          const { handleFilter, field } = filter
          return handleFilter(row[field])
        })
      })
    : rows

  return (
    <tbody className={cls(className)} ref={tableBodyRef}>
      {filteredRows.map((row: TableRowType, index) => {
        const { disabled } = row
        const cells = columns

        return (
          <tr className={''} key={index} onClick={() => !disabled && handleRowClick && handleRowClick(row)}>
            {cells.map((cell, index) => {
              const { key, tdClassName, tdRender } = cell
              const field = get(row, key)
              const isOption = typeof field === 'object'

              const render = tdRender ? tdRender(field, row) : isOption ? field && field.label : field

              const isFirstColumn = index === 0
              const isLastColumn = index === cells.length - 1

              return (
                <td
                  className={cls(
                    {
                      /*'border-l': isFirstColumn,*/
                      'no-border-r': isLastColumn
                    },
                    tdClassName
                  )}
                  key={index}
                  data-testid={'tbody-row'}
                >
                  <div className={''}>{render}</div>
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
