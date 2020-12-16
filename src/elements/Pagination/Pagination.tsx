import React from 'react'
import { PaginationResponse } from '@types'
import styles from './Pagination.module.scss'

interface PaginationProps extends PaginationResponse {
  limit?: number
  onPageClick(page: number): void
}

const Pagination: React.FC<PaginationProps> = props => {
  const { current, totalPages = 1, limit = 7, onPageClick } = props
  if (!current) return null

  /* Pages from the left and right to render */
  const pagesOffset = Math.floor(limit / 2)

  /* If current page is in page offset so current in first pages */
  const isFirstPages = current <= pagesOffset
  /* If current page + page offset greater than total pages the current is in last pages */
  const isLastPages = current + pagesOffset > totalPages!

  /* Start page */
  let start: number
  /* End page */
  let end: number

  if (isFirstPages) {
    /*
      If first pages:
        start: 1
        end: limit or total pages
    */
    start = 1
    end = Math.min(limit, totalPages!)
  } else if (isLastPages) {
    /*
      If last pages:
        start: total pages - limit without inclusion or 1
        end: total pages

      - 1 because of last page inclusion
    */

    start = Math.max(totalPages! - (limit - 1), 1)
    end = totalPages!
  } else {
    /*
      Else:
        start: current - page offset
        end: last page in a row or total pages
    */
    start = current - pagesOffset
    end = Math.min(current + pagesOffset, totalPages!)
  }

  const renderPages = () => {
    return new Array(limit).fill(0).map((_, index) => {
      const page = start + index

      /* End constrait */
      if (page > end) return

      const isActive = page === current

      return (
        <li
          key={index}
          tabIndex={0}
          className={styles.paginationListItem}
          onClick={() => onPageClick(page)}
          data-active={isActive}
        >
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
