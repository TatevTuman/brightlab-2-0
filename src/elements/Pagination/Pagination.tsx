import React from 'react'
import { PaginationResponse } from '@types'
import styles from './Pagination.module.scss'

interface PaginationProps extends PaginationResponse {
  limit?: number
  onClick(page: number): void
}

const Pagination: React.FC<PaginationProps> = props => {
  const { current, total: totalItems, limit = 7, onClick } = props
  if (!current || !totalItems) return null

  const pagesOffset = Math.floor(limit / 2)

  /* if current is less than a half of limit */
  const isFirstPages = current <= pagesOffset
  /* if current is greater than totalItems a half of limit subtraction */
  const isLastPages = current > totalItems - pagesOffset

  /* Start page */
  let start: number
  /* End page */
  let end: number

  if (isFirstPages) {
    /*
      If first pages:
        start: 1
        end: limit
    */
    start = 1
    end = limit
  } else if (isLastPages) {
    /*
      If last pages:
        start: total - limit
        end: total

      - 1 because of last page inclusion
    */
    start = totalItems - (limit - 1)
    end = totalItems
  } else {
    /*
      Else:
        start: current - page offset
        end: current + page offset
    */
    start = current - pagesOffset
    end = current + pagesOffset
  }

  const renderPages = () => {
    const pages = new Array(limit).fill(0).map((_, index) => start + index)

    return pages.map((page, index) => {
      const isActive = page === current

      return (
        <li key={index} tabIndex={0} className={styles.paginationListItem} onClick={() => onClick(page)} data-active={isActive}>
          {page}
        </li>
      )
    })
  }

  return (
    <nav role="pagination" className={styles.pagination}>
      <ul className={styles.paginationList}>{renderPages()}</ul>
    </nav>
  )
}

export default Pagination
