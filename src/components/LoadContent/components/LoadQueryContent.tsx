import React, { useEffect, useState } from 'react'
import { QueryDataOptions, QueryResult, useQuery } from '@apollo/client'
import { ErrorBoundary, LoadQueryContentError } from '@components'
import { LoadContentLoaderType } from '../LoadContent'

interface LoadQueryContentProps<TData, TVariables> extends QueryDataOptions<TData, TVariables> {
  loader: LoadContentLoaderType
  children(result: QueryResult<TData, TVariables>): JSX.Element
}

const LoadQueryContent = <TData, TVariables>(props: LoadQueryContentProps<TData, TVariables>): JSX.Element | null => {
  const { query, variables, children, loader, onError, ...baseQueryOptions } = props

  const [loading, handleLoading] = useState(false)
  const request = useQuery<TData, TVariables>(query, { variables, ...baseQueryOptions })
  const { data, loading: requestLoading, error } = request

  useEffect(() => {
    if (requestLoading) handleLoading(requestLoading)
    else setTimeout(() => handleLoading(requestLoading), loader.delay)
  }, [requestLoading])

  if (error) {
    onError && onError(error)

    // TODO
    if (error.networkError) {
      /* @ts-ignore */
      throw new LoadQueryContentError(error.networkError.custom)
    } else {
      /* @ts-ignore */
      throw new LoadQueryContentError(error)
    }
  }

  if ((loading || loader.directLoading) && !loader.disabled) return <div>Loading...</div>

  if (!data) return null

  return (
    <ErrorBoundary title={'Произошлая ошибка загрузки query!'}>
      <div className="loaded-content__query">{children(request)}</div>
    </ErrorBoundary>
  )
}

export default LoadQueryContent
