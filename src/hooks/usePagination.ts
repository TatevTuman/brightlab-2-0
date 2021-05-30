import { useState } from 'react'
import { useQuery, DocumentNode, QueryHookOptions } from '@apollo/client'
import { QueryPaginationResponse, QueryPaginationArgs } from '@types'

export type UsePaginationArgs<TVariables = Omit<QueryPaginationArgs, 'pagination'>> = {
  query: DocumentNode
  variables: TVariables
  options?: Omit<QueryHookOptions, 'variables'>
  initialPage: number
  initialPageSize: number
}

const usePagination = <TData, TVariables = Omit<QueryPaginationArgs, 'pagination'>>(
  query: DocumentNode,
  variables: TVariables,
  options?: Omit<QueryHookOptions, 'variables'>,
  initialPage = 1,
  initialPageSize = 4
) => {
  const [[page, pageSize], setPage] = useState([initialPage, initialPageSize])

  /* Runs query */
  const paginatedQueryData = useQuery<{ res: QueryPaginationResponse<TData> }, TVariables>(query, {
    variables: { ...variables, pagination: { page, pageSize } },
    ...options
  })

  /* Defines fetchMore function to control pagination */
  const fetchMore = async (variables: TVariables, forcePage?: number, forcePageSize?: number) => {
    const isVariables = Object.keys(variables).length > 0

    if (isVariables) {
      /* When any variable is passed resets the page */
      const nextPage = 1
      const nextPageSize = forcePageSize || pageSize

      setPage([nextPage, nextPageSize])

      return paginatedQueryData.fetchMore({
        variables: {
          ...variables,
          pagination: { page: nextPage, pageSize: nextPageSize }
        }
      })
    } else {
      const nextPage = forcePage || page + 1
      const nextPageSize = forcePageSize || pageSize

      setPage([nextPage, nextPageSize])

      return paginatedQueryData.fetchMore({
        variables: {
          ...variables,
          pagination: { page: nextPage, pageSize: nextPageSize }
        }
      })
    }
  }

  /* Removes unnecessary data */
  const { fetchMore: _, data, ...usePaginationData } = paginatedQueryData

  const content = data?.res.content
  const pagination = data?.res.pagination

  return {
    ...usePaginationData,
    content,
    pagination,
    fetchMore
  }
}

export default usePagination
