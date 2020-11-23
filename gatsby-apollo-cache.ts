import { InMemoryCache, makeVar } from '@apollo/client'
import { CacheModal, CacheDrawer } from '@types'

export const modalsVar = makeVar<CacheModal[]>([])
export const drawersVar = makeVar<CacheDrawer[]>([])

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        modals: {
          read() {
            return modalsVar()
          }
        },
        drawers: {
          read() {
            return drawersVar()
          }
        }
      }
    }
  }
})

export default cache
