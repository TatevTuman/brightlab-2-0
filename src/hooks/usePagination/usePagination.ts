import { useState } from 'react'
import { useQuery, DocumentNode, QueryHookOptions } from '@apollo/client'

const usePagination = <TData, TVariables>(
  query: DocumentNode,
  variables: TVariables,
  options?: Omit<QueryHookOptions, 'variables'>,
  initialPage = 1,
  initialPageSize = 4
) => {
  const [[page, pageSize], setPage] = useState([initialPage, initialPageSize])

  /* Runs query */
  const paginatedQueryData = useQuery<{ res: TData }, TVariables>(query, {
    variables: { ...variables, pagination: { page, pageSize } },
    ...options
  })

  /* defined fetchMore function to control pagination */
  const fetchMore = async (variables: TVariables, forcePage?: number, forcePageSize?: number) => {
    setPage([forcePage || page + 1, forcePageSize || pageSize])

    return paginatedQueryData.fetchMore({
      variables: {
        ...variables,
        pagination: { page: forcePage || page + 1, pageSize: forcePageSize || pageSize }
      }
    })
  }

  return {
    ...paginatedQueryData,
    page,
    pageSize,
    fetchMore
  }
}

export default usePagination
