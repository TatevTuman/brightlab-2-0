export type TableColumnType = {
  title: string
  dataIndex: string
  key: string
  hidden?: boolean
  width?: string
  render?: (cell: any, row: TableRowType) => any
}

export type TableRowType = {
  [column: string]: any
}
