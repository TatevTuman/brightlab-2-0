import { useState } from 'react'

export type UsePaginationMockType = (
  initialPage?: number,
  initialPageSize?: number
) => {
  data: number[]
  page: number
  pageSize: number
  fetchMore(): void
}

const usePagination = (initialPage = 1, initialPageSize = 4) => {
  const [data, setData] = useState<number[]>([1, 2, 3, 4, 5])
  const [[page, pageSize], setPage] = useState([initialPage, initialPageSize])

  const fetchMore = jest.fn((forcePage, forcePageSize) => {
    const count = (forcePage || page) * (forcePageSize || pageSize)
    const nextData = new Array(count).fill(0).map((_, index) => index)

    setData(nextData)
    setPage([forcePage || page + 1, forcePageSize || pageSize])
  })

  return {
    data,
    page,
    pageSize,
    fetchMore
  }
}

export default usePagination
