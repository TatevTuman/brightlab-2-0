import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import { TableColumnType } from '@types'
import { Button } from '@elements'
import Table from './Table'

beforeAll(() => {})
afterAll(() => {})
beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Table', () => {
  const columns: TableColumnType[] = [
    {
      title: 'Имя',
      key: 'name'
    },
    {
      title: 'Фамилия',
      key: 'surname'
    },
    {
      title: 'Возраст',
      key: 'age',
      style: {
        width: '100px'
      }
    },
    {
      title: '',
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

  const rows = new Array(10).fill(0).map((_, index) => ({
    name: 'John',
    surname: 'Doe',
    age: index.toString()
  }))

  const props = { columns, rows }

  it('renders correctly', async () => {
    const { container } = render(<Table {...props} />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
  })

  it('renders columns correctly', () => {
    const { getByText } = render(<Table {...props} />)

    columns.forEach(column => {
      const { title } = column

      if (title) {
        expect(getByText(title)).toBeInTheDocument()
      }
    })
  })

  it('renders rows correctly', () => {
    const { container, getByText } = render(<Table {...props} />)

    rows.forEach(row => {
      const { name, surname, age } = row
    })
  })
})
