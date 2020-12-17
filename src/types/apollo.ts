import { ApolloClient } from '@apollo/client'
import { FilterArgs } from './generated'

export type Client = ApolloClient<Record<string, any>>

export type PaginationType = {
  itemCount: number
  total: number
  pageSize: number
  totalPages: number
  current: number
}

export type PaginationArgs = {
  page: number
  pageSize: number
}

export type QueryPaginationArgs = {
  pagination?: PaginationArgs
  filters?: FilterArgs
  sortBy?: string
}

export type QueryPaginationResponse<T> = {
  content: T[]
  pagination: PaginationType
}
