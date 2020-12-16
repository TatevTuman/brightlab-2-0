import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Pagination from './Pagination'
import userEvent from '@testing-library/user-event'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Pagination', () => {
  const props = {
    itemCount: 1000,
    total: 100,
    pageSize: 10,
    totalPages: 10,
    current: 1,
    limit: 5,
    onPageClick: jest.fn()
  }

  it('renders correctly', async () => {
    const { container, getByRole } = render(<Pagination {...props} />)

    expect(container).toMatchSnapshot()
    expect(getByRole('pagination')).toBeInTheDocument()
  })

  it('doesn`t render without current', async () => {
    const { container } = render(<Pagination {...props} current={0} />)
    const pagination = container.querySelector('nav[role="pagination"]')

    expect(pagination).toBeNull()
  })

  it('renders pages correctly', async () => {
    let current = 5
    let offset = current - Math.floor(current / 2)
    const { getByText, rerender } = render(<Pagination {...props} current={current} />)

    new Array(props.limit).fill(0).forEach((_, index) => {
      expect(getByText((index + offset).toString())).toBeInTheDocument()
    })

    expect(getByText('5')).toHaveAttribute('data-active', 'true')

    current = 9
    offset = current - Math.floor(current / 2) + 1 // 1 is inclusion
    rerender(<Pagination {...props} current={current} />)

    new Array(props.limit).fill(0).forEach((_, index) => {
      expect(getByText((index + offset).toString())).toBeInTheDocument()
    })

    expect(getByText('9')).toHaveAttribute('data-active', 'true')
  })

  it('renders pages with totalPages correctly', async () => {
    const current = 5
    const { getByText } = render(<Pagination {...props} current={current} totalPages={3} />)

    new Array(3).fill(0).forEach((_, index) => {
      expect(getByText((index + 1).toString())).toBeInTheDocument()
    })
  })

  it('clicks on page', async () => {
    const { getByText } = render(<Pagination {...props} />)

    userEvent.click(getByText('1'))
    expect(props.onPageClick).toHaveBeenCalledTimes(1)

    userEvent.click(getByText('2'))
    expect(props.onPageClick).toHaveBeenCalledTimes(2)
  })
})
