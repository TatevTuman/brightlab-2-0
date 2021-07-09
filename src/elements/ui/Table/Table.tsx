import React, { memo } from 'react'
import cls from 'classnames'
import { Children, ClassName } from '~types'
import { TableHead, TableBody } from './components'

export type TableVariantType = 'primary'

const tableBaseVariant = 'table'

const getTableVariantClass = (variant: TableVariantType, className?: ClassName) => cls(className, tableBaseVariant)

export type TableColumnType = {
  title: string
  key: string | number
  thClassName?: ClassName
  tdClassName?: ClassName
  thRender?: (title: string, key: string) => Children
  tdRender?: (cell: any, row: TableRowType) => Children
}

export type TableRowType = {
  disabled?: boolean
  [column: string]: any
}

export interface TableProps {
  className?: ClassName
  wrapperClassName?: ClassName
  headClassName?: ClassName
  bodyClassName?: ClassName
  variant?: TableVariantType
  columns: TableColumnType[]
  rows: TableRowType[]
  filters?: { field: string; handleFilter: (...args: any) => boolean }[]
  handleRowClick?: (row: TableRowType) => void
}

const Table: React.FC<TableProps> = props => {
  const {
    className,
    wrapperClassName,
    headClassName,
    bodyClassName,
    variant = 'primary',
    columns,
    rows,
    filters,
    handleRowClick
  } = props

  return (
    <div className={cls(wrapperClassName, 'w-full inline-flex overflow-x-scroll')}>
      <table className={getTableVariantClass(variant, className)}>
        <TableHead className={headClassName} columns={columns} />
        <TableBody
          className={bodyClassName}
          rows={rows}
          columns={columns}
          filters={filters}
          handleRowClick={handleRowClick}
        />
      </table>
    </div>
  )
}

export default memo(Table)
