import { CreateRole } from '@graphql'
import { Client, Role } from '@types'

export interface RolesLayerApi {}

export default (client: Client): RolesLayerApi => {
  return {
    async createRole() {
      try {
        const request = await client.query<{ role: Role }>({ query: CreateRole })

        console.log('request', request.data)

        if (request && request.data) {
          const { role } = request.data
          return role
        } else {
          return null
        }
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
