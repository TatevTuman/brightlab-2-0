/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { memo } from 'react'
import { List, ListPropsColumnsType } from '@components'
import { Pagination } from '@elements'
import { handleEvent } from '@utils'
import { PaginationType } from '@types'
import styles from './Paginated.module.scss'

interface PaginatedProps {
  content?: any[]
  pagination?: PaginationType
  list: {
    columns: ListPropsColumnsType
    offset: number
  }
  loading: boolean
  error?: Error
  Component: React.ComponentType<{ listData: any }> | React.FunctionComponent<{ listData: any }>
  onPageClick?: (page: number) => void
  onItemClick?: (item: any) => void
}

const Paginated: React.FC<PaginatedProps> = props => {
  const { content, pagination, list, loading, error, Component, onItemClick, onPageClick } = props

  return (
    <div className={styles.paginated}>
      <List
        items={content || []}
        columns={list.columns}
        offset={list.offset}
        Component={Component}
        onItemClick={item => handleEvent(onItemClick, { value: item })}
        loading={loading}
        error={error}
      />
      <Pagination {...pagination} onClick={page => handleEvent(onPageClick, { value: page })} />
    </div>
  )
}

export default memo(Paginated)
