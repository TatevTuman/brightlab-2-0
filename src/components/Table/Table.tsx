import React, { memo } from 'react'
import { TableColumnType, TableRowType } from '@types'
import { TableHead, TableBody } from './components'
import styles from './Table.module.scss'

interface TableProps {
  columns: TableColumnType[]
  rows: TableRowType[]
  filters?: { field: string; handleFilter: (...args: any) => boolean }[]
  handleRowClick?: (row: TableRowType) => void
  isRowIndex?: boolean
  minWidth?: string
}

const Table: React.FC<TableProps> = props => {
  const { columns, rows, filters, handleRowClick, isRowIndex, minWidth } = props

  return (
    <table className={styles.table} style={{ minWidth }}>
      <TableHead columns={columns} isRowIndex={isRowIndex} />
      <TableBody
        rows={rows}
        columns={columns}
        filters={filters}
        handleRowClick={handleRowClick}
        isRowIndex={isRowIndex}
      />
    </table>
  )
}

export default memo(Table)
