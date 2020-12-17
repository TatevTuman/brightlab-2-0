/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { memo } from 'react'
import { Loader } from '@elements'
import { useWindowSize } from '@hooks'
import styles from './List.module.scss'

export interface ListPropsColumnsType {
  mobile?: number
  landscape?: number
  tablet?: number
  desktop: number
}

interface ListProps {
  items: any[]
  columns: ListPropsColumnsType
  offset: number
  Component: React.ComponentType<{ listData: any }> | React.FunctionComponent<{ listData: any }>
  onItemClick?: (item: any) => void
  loading?: boolean
  error?: Error
  noMessage?: string
}

const List: React.FC<ListProps> = props => {
  const { breakpoint } = useWindowSize()
  const { items, columns, offset, Component, onItemClick, noMessage = 'Not found', loading = false, error } = props

  const renderItems = () => {
    const isItems = items && items.length

    if (error) {
      return (
        <div className="">
          <p className="danger">{error.message}</p>
          {JSON.stringify(error)}
        </div>
      )
    }

    if (loading) {
      return <Loader type={'Plane'} />
    }

    if (!isItems) {
      return <h2 className={styles.listEmpty}>{noMessage}</h2>
    }

    const margin = offset / 2
    const platformColumns = columns[breakpoint as keyof ListPropsColumnsType] || columns.desktop

    const itemStyle = {
      width: `calc(${100 / platformColumns}% - ${offset}px)`,
      margin: `0 ${margin}px 1rem`
    }

    return items!.map((item, index) => {
      return (
        <div key={index} className={styles.listItem} style={itemStyle} onClick={() => onItemClick && onItemClick(item)}>
          <Component listData={item} />
        </div>
      )
    })
  }

  return <div className={styles.list}>{renderItems()}</div>
}

export default memo(List)
