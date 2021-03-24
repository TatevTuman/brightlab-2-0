import React, { CSSProperties, memo } from 'react'
import { get } from 'lodash'
import './Table.scss'

export type TableColumnType<T> = {
  key: string
  title: string
  style?: CSSProperties
  render?(field: any, item: T): JSX.Element
}

export type TableCellType = {
  disabled?: boolean
}

export interface TableProps<T> {
  columns: TableColumnType<T>[]
  data: T[]
}

const TableColumns = <T extends TableCellType>(props: { columns: TableColumnType<T>[] }) => {
  const { columns } = props

  return (
    <>
      {columns.map(columns => {
        const { key, title, style } = columns

        return (
          <div key={`column-${key}`} className={'grid-table-column'} style={style}>
            {title}
          </div>
        )
      })}
    </>
  )
}

const TableRows = <T extends TableCellType>(props: TableProps<T>) => {
  const { columns, data } = props

  return (
    <>
      {data.map((item: T, index: number) => {
        return columns.map(column => {
          const { key } = column

          const itemData = get(item, key, null)
          const render = column.render ? column.render(itemData, item) : itemData

          return (
            <div key={`cell-${key}-${index}`} className={'grid-table-cell'} data-disabled={item.disabled}>
              {render}
            </div>
          )
        })
      })}
    </>
  )
}

const Table = <T extends TableCellType>(props: TableProps<T>) => {
  const { columns, data } = props

  return (
    <div className={'grid-table'} style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
      <TableColumns<T> columns={columns} />
      <TableRows<T> columns={columns} data={data} />
    </div>
  )
}

export default memo(Table)
