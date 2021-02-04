import { InMemoryCache } from '@apollo/client'

export type Context = {
  cache: InMemoryCache
}

export type CacheModal<S = any> = {
  name: string
  state?: S
}

export type CacheDrawer = {
  name: string
  state?: Record<string, any>
}
