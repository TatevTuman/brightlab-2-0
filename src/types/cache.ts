import { InMemoryCache } from '@apollo/client'

export type Context = {
  cache: InMemoryCache
}

export type CacheModal = {
  name: string
  state?: Record<string, any>
}
