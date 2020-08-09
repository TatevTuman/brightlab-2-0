import React from 'react'
import Table from './Table'
import { Button } from '@elements'
import { TableColumnType } from '@types'

export default {
  title: 'Table',
  component: Table
}

export const Story = () => {
  const columns: TableColumnType[] = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      key: 'surname'
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '',
      dataIndex: 'info',
      key: 'info',
      render(cell, row) {
        const info = row.name + ' ' + row.surname + ' ' + row.age
        return (
          <Button type={'secondary'} size={'md'} onClick={() => alert(info)}>
            Get Info
          </Button>
        )
      }
    }
  ]

  const rows = new Array(10).fill(0).map(() => ({
    name: 'John',
    surname: 'Doe',
    age: '34'
  }))

  return (
    <div className="story">
      <Table columns={columns} rows={rows} handleRowClick={() => alert('Row clicked!')} isRowIndex />
    </div>
  )
}
