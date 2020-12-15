import React from 'react'
import { Loader } from '@elements'
import { useWindowSize } from '@hooks'
import styles from './List.module.scss'

interface ListPropsColumnsType {
  mobile?: number
  landscape?: number
  tablet?: number
  desktop: number
}

interface ListProps<T> {
  items: T[]
  columns: ListPropsColumnsType
  offset: number
  Component: React.ComponentType<T> | React.FunctionComponent<T>
  loading?: boolean
  noMessage?: string
}

const List = <T,>(props: ListProps<T>) => {
  const { breakpoint } = useWindowSize()
  const { items, columns, offset, Component, noMessage = 'Not found', loading = false } = props

  const renderItems = () => {
    const isItems = items && items.length

    if (loading) {
      return <Loader />
    }

    if (isItems) {
      const margin = offset / 2
      const platformColumns = columns[breakpoint as keyof ListPropsColumnsType] || columns.desktop

      const itemStyle = {
        width: `calc(${100 / platformColumns}% - ${offset}px)`,
        margin: `0 ${margin}px 1rem`
      }

      return items!.map((item, index) => {
        return (
          <div key={index} className={styles.listItem} style={itemStyle}>
            <Component {...item} />
          </div>
        )
      })
    }

    return <h2 className={styles.listEmpty}>{noMessage}</h2>
  }

  return <div className={styles.list}>{renderItems()}</div>
}

export default List
