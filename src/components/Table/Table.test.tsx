import React from 'react'
import renderer from 'react-test-renderer'
import Table from './Table'
import { TableColumnType } from '@types'
import { Button } from '@elements'

describe('Table', () => {
  it('render()', () => {
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
          return (
            <Button type={'secondary'} size={'md'}>
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

    const table = renderer
      .create(
        <div className="story">
          <Table columns={columns} rows={rows} isRowIndex />
        </div>
      )
      .toJSON()
    expect(table).toMatchSnapshot()
  })
})
