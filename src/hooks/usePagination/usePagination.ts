import { useState } from 'react'
import { useQuery, DocumentNode, QueryHookOptions } from '@apollo/client'
import { QueryPaginationResponse, QueryPaginationArgs, FilterArgs } from '@types'

const usePagination = <TData, TVariables extends Omit<QueryPaginationArgs, 'pagination'>>(
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
    setPage([forcePage || page + 1, forcePageSize || pageSize])

    return paginatedQueryData.fetchMore({
      variables: {
        ...variables,
        pagination: { page: forcePage || page + 1, pageSize: forcePageSize || pageSize }
      }
    })
  }

  const refetch = async (filters: FilterArgs) => {
    /* Refetch the same query with filters */
    const refetchedPaginatedQueryData = await paginatedQueryData.refetch({
      ...variables,
      filters: {
        ...variables.filters,
        ...filters
      }
    })

    const { data } = refetchedPaginatedQueryData
    const content = data?.res.content
    const pagination = data?.res.pagination

    /*
      If after filtering we have no content, we should use fetchMore to set a new page.
    */
    if (content && !content.length && pagination) {
      const lastPage = pagination.totalPages! || 1
      return fetchMore(
        {
          ...variables,
          filters: {
            ...variables.filters,
            ...filters
          }
        },
        lastPage
      )
    }

    return refetchedPaginatedQueryData
  }

  /* Removes unnecessary data */
  const { fetchMore: _, refetch: __, data, ...usePaginationData } = paginatedQueryData

  const content = data?.res.content
  const pagination = data?.res.pagination

  return {
    ...usePaginationData,
    content,
    pagination,
    fetchMore,
    refetch
  }
}

export default usePagination
