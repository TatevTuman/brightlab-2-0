import React, { useEffect, useState } from 'react'
import { useMutation, MutationDataOptions, MutationFunction, MutationResult } from '@apollo/client'
import { ErrorBoundary, LoadMutationContentError } from '@components'
import { LoadContentLoaderType } from '../LoadContent'

interface LoadMutationContentProps<TData, TVariables> extends MutationDataOptions<TData, TVariables> {
  loader: LoadContentLoaderType
  children(mutateFunction: MutationFunction<TData, TVariables>, result: MutationResult<TData>): JSX.Element
}

const LoadMutationContent = <TData, TVariables>(
  props: LoadMutationContentProps<TData, TVariables>
): JSX.Element | null => {
  const { mutation, variables, onCompleted, onError, children, loader, ...baseMutationOptions } = props

  const [loading, handleLoading] = useState(false)
  const request = useMutation<TData, TVariables>(mutation, { variables, ...baseMutationOptions })
  const [mutateFunction, { data, loading: requestLoading, error }] = request

  useEffect(() => {
    if (requestLoading) handleLoading(requestLoading)
    else
      setTimeout(() => {
        handleLoading(requestLoading)

        // TODO
        if (data) {
          const dataKey = Object.keys(data)[0]
          /* @ts-ignore */
          const { result, messages, successful } = data[dataKey]

          if (!successful) {
            onError && onError(messages)
          }

          /* @ts-ignore */
          if (successful || typeof data[dataKey] === 'string') {
            onCompleted && onCompleted(data)
          }
        }
      }, loader.delay)
  }, [requestLoading])

  if (error) {
    onError && onError(error)

    // TODO
    if (error.networkError) {
      /* @ts-ignore */
      throw new LoadMutationContentError(error.networkError.custom)
    } else {
      /* @ts-ignore */
      throw new LoadMutationContentError(error)
    }
  }

  if ((loading || loader.directLoading) && !loader.disabled) return <div>Loading...</div>

  return (
    <ErrorBoundary title={'Произошлая ошибка выполнения mutation!'}>
      <div className="loaded-content__mutation">{children(...request)}</div>
    </ErrorBoundary>
  )
}

export default LoadMutationContent
