import { useState } from 'react'
import { useQuery, DocumentNode } from '@apollo/client'

const usePagination = <TData, TVariables>(
  query: DocumentNode,
  variables: TVariables,
  initialPage = 1,
  initialPageSize = 4
) => {
  const [[page, pageSize], setPage] = useState([initialPage, initialPageSize])

  const paginatedQueryData = useQuery<{ res: TData }, TVariables>(query, {
    variables: { ...variables, pagination: { page, pageSize } }
  })

  const fetchMore = async (variables: TVariables, forcePage?: number, forcePageSize?: number) => {
    setPage([forcePage || page + 1, forcePageSize || pageSize])

    return await paginatedQueryData.fetchMore({
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
