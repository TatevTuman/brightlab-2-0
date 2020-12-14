import { InMemoryCache, makeVar } from '@apollo/client'
import { CacheModal } from '@types'
import possibleTypes from './gatsby-apollo-cache-types.json';

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
        // feed: {
        //   // Don't cache separate results based on
        //   // any of this field's arguments.
        //   keyArgs: false,
        //   // Concatenate the incoming list items with
        //   // the existing list items.
        //   merge(existing = [], incoming) {
        //     return [...existing, ...incoming];
        //   },
        // }
      }
    }
  }
})

export default cache
