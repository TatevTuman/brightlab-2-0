import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Table, { TableProps } from './Table'
import userEvent from '@testing-library/user-event'

const columns = [
  {
    key: 'column1',
    title: 'Column1'
  },
  {
    key: 'column2',
    title: 'Column2'
  },
  {
    key: 'column3',
    title: 'Column3'
  },
  {
    key: 'column4',
    title: 'Column4'
  },
  {
    key: 'column5',
    title: 'Column5'
  },
  {
    key: 'column6',
    title: 'Column6'
  }
]

const data = new Array(10).fill(0).map((_, index) => {
  return columns.reduce<{ [x: string]: string }>((acc, column) => {
    return {
      ...acc,
      [column.key]: column.title + index
    }
  }, {})
})

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Table', () => {
  const props = { columns, data }

  it('renders correctly', async () => {
    const { container } = render(<Table {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })

  it('renders columns correctly', () => {
    const { getByText } = render(<Table {...props} />)

    columns.forEach((column, index) => {
      const { title } = column

      if (title) {
        expect(getByText(title + index)).toBeInTheDocument()
      }
    })
  })

  it('renders cells correctly', () => {
    const { getByText } = render(<Table {...props} />)

    data.forEach(item => {
      columns.forEach(column => {
        expect(getByText(item[column.key])).toBeInTheDocument()
      })
    })
  })

  // it('handles onRowClick', () => {
  //   const handleRowClick = jest.fn()
  //
  //   const { container } = render(<Table {...props} handleRowClick={handleRowClick} />)
  //   const disabledRowElement = container.querySelector('.table-body-tr[data-disabled=true]')
  //   const enabledRowElement = container.querySelector('.table-body-tr[data-disabled=false]')
  //
  //   userEvent.click(disabledRowElement!)
  //   expect(handleRowClick).toHaveBeenCalledTimes(0)
  //
  //   userEvent.click(enabledRowElement!)
  //   expect(handleRowClick).toHaveBeenCalledTimes(1)
  // })
  //
  // it('renders filters correctly', () => {
  //   const filters = [
  //     {
  //       field: 'age',
  //       handleFilter: jest.fn((age: number) => {
  //         return +age >= 5
  //       })
  //     }
  //   ]
  //
  //   const { container, rerender } = render(<Table {...props} />)
  //
  //   let rowElements = container.querySelectorAll('.table-body-tr')
  //   expect(rowElements).toHaveLength(10)
  //
  //   rerender(<Table {...props} filters={filters} />)
  //
  //   rowElements = container.querySelectorAll('.table-body-tr')
  //   expect(rowElements).toHaveLength(5)
  //   expect(filters[0].handleFilter).toHaveBeenCalledTimes(rows.length)
  // })
})
