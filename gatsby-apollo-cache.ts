import { InMemoryCache, makeVar } from '@apollo/client'
import { CacheModal, QueryPaginateGolfClubModelsArgs } from '@types'
import possibleTypes from './gatsby-apollo-cache-types.json'

export const modalsVar = makeVar<CacheModal[]>([])

const cache = new InMemoryCache({
  possibleTypes,
  typePolicies: {
    Query: {
      fields: {
        modals: {
          read() {
            return modalsVar()
          }
        },
        /* Fetch more logic */
        paginateGolfClubModels: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false
          // Concatenate the incoming list items with
          // the existing list items.
          // merge(existing = [] incoming) {
          //   return [...existing, ...incoming]
          // },
          // read(existing, { args }) {
          //   if (!existing) return
          //   // A read function should always return undefined if existing is
          //   // undefined. Returning undefined signals that the field is
          //   // missing from the cache, which instructs Apollo Client to
          //   // fetch its value from your GraphQL server.
          //   return existing
          // }
        }
      }
    }
  }
})

export default cache
