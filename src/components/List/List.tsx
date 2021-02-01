/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { memo } from 'react'
import { Loader } from '@elements'
import { useWindowSize } from '@hooks'
import styles from './List.module.scss'

export interface ListPropsColumnsType<T = number> {
  mobile?: T
  landscape?: T
  tablet?: T
  desktop: T
}

export interface ListProps {
  list: any[]
  breakpointColumns?: ListPropsColumnsType
  breakpointOffsets?: ListPropsColumnsType<[number, number]>
  Component: React.ComponentType<{ listData: any }> | React.FunctionComponent<{ listData: any }>
  onItemClick?: (item: any) => void
  loading?: boolean
  error?: Error
  noMessage?: string
}

const List: React.FC<ListProps> = props => {
  const { breakpoint } = useWindowSize()

  const {
    list,
    breakpointColumns = {
      mobile: 1,
      landscape: 2,
      tablet: 3,
      desktop: 4
    },
    breakpointOffsets = {
      mobile: [10, 10],
      landscape: [20, 10],
      tablet: [30, 15],
      desktop: [40, 20]
    },
    Component,
    onItemClick,
    noMessage = 'Not found',
    loading = false,
    error
  } = props

  const columns = breakpointColumns[breakpoint as keyof ListPropsColumnsType] || breakpointColumns.desktop
  const offsets = breakpointOffsets[breakpoint as keyof ListPropsColumnsType] || breakpointOffsets.desktop

  /* 14 - base font size */
  const marginHorizontal = offsets[1] / 14 / 2
  const marginVertical = offsets[0] / 14 / 2

  const renderItems = () => {
    const isItems = list && list.length

    if (error) {
      return (
        <div className="">
          <p className="danger">{error.message}</p>
          {JSON.stringify(error)}
        </div>
      )
    }

    if (loading) {
      return <Loader />
    }

    if (!isItems) {
      return (
        <div className={styles.listEmpty} style={{ margin: `${marginVertical}rem ${marginHorizontal}rem` }}>
          <i>{noMessage}</i>
        </div>
      )
    }

    const itemStyle = {
      width: `calc(${100 / columns}% - ${marginHorizontal * 2}rem)`,
      margin: `${marginVertical}rem ${marginHorizontal}rem`
    }

    return list!.map((item, index) => {
      return (
        <div key={index} className={styles.listItem} style={itemStyle} onClick={() => onItemClick && onItemClick(item)}>
          <Component listData={item} />
        </div>
      )
    })
  }

  const itemListStyle = {
    margin: `-${marginVertical}rem -${marginHorizontal}rem`
  }

  return (
    <div style={itemListStyle} className={styles.list}>
      {renderItems()}
    </div>
  )
}

export default memo(List)
