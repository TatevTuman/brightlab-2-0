import React from 'react'
import {
  OperationVariables,
  QueryResult,
  QueryFunctionOptions,
  MutationResult,
  BaseMutationOptions,
  MutationFunction,
  DocumentNode
} from '@apollo/client'

import { LoadQueryContent, LoadMutationContent } from './components'
import { ErrorBoundary, LoadContentError } from '@components'

import './LoadContent.scss'

export type LoadContentLoaderType = {
  delay?: number
  disabled?: boolean
  directLoading?: boolean
}

type LoadContentQueryChildren<TData, TVariables> = (result: QueryResult<TData, TVariables>) => JSX.Element
type LoadContentMutationChildren<TData, TVariables> = (
  mutateFunction: MutationFunction<TData, TVariables>,
  result: MutationResult<TData>
) => JSX.Element

type LoadContentProps<TData, TVariables> = {
  query?: DocumentNode
  mutation?: DocumentNode
  variables?: TVariables
  loader?: LoadContentLoaderType
  children: LoadContentQueryChildren<TData, TVariables> | LoadContentMutationChildren<TData, TVariables>
} & (QueryFunctionOptions<TData, TVariables> & BaseMutationOptions<TData, TVariables>)

const LoadContent = <TData, TVariables extends OperationVariables>(
  props: LoadContentProps<TData, TVariables>
): JSX.Element => {
  const { query, mutation, loader, children, variables, ...baseOptions } = props

  const loaderWithSettings = {
    delay: 1000,
    disabled: false,
    directLoading: false,
    ...loader
  }

  if (!query && !mutation)
    throw new LoadContentError(`You must specify either query or mutation in ${LoadContent.displayName} component`)
  if (query && mutation) throw new LoadContentError('The simultaneous use of query and mutation is prohibited')

  return (
    <ErrorBoundary title={'Произошлая ошибка загрузки контента!'}>
      <div className="loaded-content">
        {query && (
          <LoadQueryContent<TData, TVariables>
            query={query}
            variables={variables}
            loader={loaderWithSettings}
            {...baseOptions}
          >
            {children as LoadContentQueryChildren<TData, TVariables>}
          </LoadQueryContent>
        )}
        {mutation && (
          <LoadMutationContent<TData, TVariables>
            mutation={mutation}
            variables={variables}
            loader={loaderWithSettings}
            {...baseOptions}
          >
            {children as LoadContentMutationChildren<TData, TVariables>}
          </LoadMutationContent>
        )}
      </div>
    </ErrorBoundary>
  )
}

LoadContent.displayName = 'LoadContent'

export default LoadContent
