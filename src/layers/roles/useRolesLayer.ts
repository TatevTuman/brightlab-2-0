import { gql, QueryResult, useApolloClient, useQuery } from '@apollo/client'
import { Role } from '@types'
import { FetchRoles } from '@graphql'
import rolesApi, { RolesLayerApi } from './rolesApi'

interface RolesLayerQueryData {
  roles: Role[]
}

interface UseRolesLayer {
  rolesData: QueryResult<RolesLayerQueryData>
  rolesApi: RolesLayerApi
}

const useRolesLayer = (): UseRolesLayer => {
  const client = useApolloClient()

  const query = gql`
    ${FetchRoles}
  `

  const data = useQuery<RolesLayerQueryData>(query, {
    query: query,
    fetchPolicy: 'cache-and-network'
  })

  return {
    rolesData: data || {},
    rolesApi: rolesApi(client)
  }
}

export default useRolesLayer
