import { InMemoryCache, makeVar } from "@apollo/client"

/*export const test = makeVar<null>(null)*/

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        /*test: {
          read() {
            return test()
          },
        },*/
      },
    },
  },
})

export default cache
