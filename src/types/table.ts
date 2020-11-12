export type TableColumnType = {
  title: string
  key: string
  style?: Record<string, any>
  render?: (cell: any, row: TableRowType) => any
}

export type TableRowType = {
  [column: string]: any
}
