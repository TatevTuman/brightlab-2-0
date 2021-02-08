import { ApolloClient } from '@apollo/client'

export type Client = ApolloClient<Record<string, any>>

export type ResponseType<T> = {
  res: T
}

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

export type PaginationResponse = {
  itemCount: number
  total: number
  pageSize: number
  totalPages: number
  current: number
}

export type QueryPaginationArgs = {
  pagination?: PaginationArgs
  filters?: any // TODO
  sortBy?: string
}

export type QueryPaginationResponse<T> = {
  content: T[]
  pagination: PaginationType
}

export type MutationResponse = {
  status: string
  error: {
    code?: string
    detail?: string
  }
}
