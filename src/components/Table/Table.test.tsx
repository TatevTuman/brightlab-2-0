import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import { AnyObject, TableColumnType } from '@types'
import Table from './Table'
import userEvent from '@testing-library/user-event'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
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
      render: jest.fn()
    }
  ]

  const rows = new Array(10).fill(0).map((_, index) => ({
    name: 'John' + index,
    surname: 'Doe' + index,
    age: index.toString(),
    disabled: index === 4
  }))

  const props = { columns, rows }

  it('renders correctly', async () => {
    const { container } = render(<Table {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
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

  it('renders columns row index correctly', () => {
    const { getByTestId } = render(<Table {...props} isRowIndex />)

    expect(getByTestId('thead-row-index')).toBeInTheDocument()
  })

  it('renders rows correctly', () => {
    const { getByText } = render(<Table {...props} />)

    rows.forEach(row => {
      const { name, surname, age } = row

      columns.forEach(() => {
        expect(getByText(name)).toBeInTheDocument()
        expect(getByText(surname)).toBeInTheDocument()
        expect(getByText(age)).toBeInTheDocument()
      })
    })
  })

  it('renders rows row index correctly', () => {
    const { getAllByTestId } = render(<Table {...props} isRowIndex />)
    const rowIndexes = getAllByTestId('tbody-row-index')

    rowIndexes.forEach(rowIndex => {
      expect(rowIndex).toBeInTheDocument()
    })

    expect(rowIndexes).toHaveLength(rows.length)
  })

  it('applies columns styles on rows', () => {
    render(<Table {...props} />)
    const columnWithRender = columns[3]
    expect(columnWithRender.render).toHaveBeenCalledTimes(rows.length)
  })

  it('executes columns render function', () => {
    const { container } = render(<Table {...props} />)
    const columnWithStyles = columns[2]

    rows.forEach(() => {
      const rowElementCells = container.querySelectorAll('.table-body-tr-td')
      const styledRowElementCell = rowElementCells[2]

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(styledRowElementCell.style._values).toEqual(columnWithStyles.style)
    })
  })

  it('disables row', () => {
    const { container } = render(<Table {...props} />)
    const rowElements = container.querySelectorAll('.table-body-tr')

    rows.forEach((row, index) => {
      const { disabled } = row
      const rowElement = rowElements[index]

      if (disabled) {
        expect(rowElement).toHaveAttribute('data-disabled', 'true')
      } else {
        expect(rowElement).toHaveAttribute('data-disabled', 'false')
      }
    })
  })

  it('clicks on a row', () => {
    const handleRowClick = jest.fn()

    const { container } = render(<Table {...props} handleRowClick={handleRowClick} />)
    const disabledRowElement = container.querySelector('.table-body-tr[data-disabled=true]')
    const enabledRowElement = container.querySelector('.table-body-tr[data-disabled=false]')

    userEvent.click(disabledRowElement!)
    expect(handleRowClick).toHaveBeenCalledTimes(0)

    userEvent.click(enabledRowElement!)
    expect(handleRowClick).toHaveBeenCalledTimes(1)
  })

  it('filters rows', () => {
    const filters = [
      {
        field: 'age',
        handleFilter: jest.fn((age: number) => {
          return +age >= 5
        })
      }
    ]

    const { container, rerender } = render(<Table {...props} />)

    let rowElements = container.querySelectorAll('.table-body-tr')
    expect(rowElements).toHaveLength(10)

    rerender(<Table {...props} filters={filters} />)

    rowElements = container.querySelectorAll('.table-body-tr')
    expect(rowElements).toHaveLength(5)
    expect(filters[0].handleFilter).toHaveBeenCalledTimes(rows.length)
  })
})
