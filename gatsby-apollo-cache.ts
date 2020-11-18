import { InMemoryCache, makeVar } from '@apollo/client'
import { CacheModal } from '@types'

export const modalsVar = makeVar<CacheModal[]>([])

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        modals: {
          read() {
            return modalsVar()
          }
        }
      }
    }
  }
})

export default cache
