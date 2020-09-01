import { useApolloClient, useQuery, gql, QueryResult } from '@apollo/client'
import { FetchCurrentUser } from '@graphql'
import authMethods, { AuthLayerMethods } from './authMethods'

interface AuthLayerQueryData {
  user: any
}

interface UseAuthLayer {
  authData: QueryResult<AuthLayerQueryData>
  authMethods: AuthLayerMethods
}

const useAuthLayer = (): UseAuthLayer => {
  const client = useApolloClient()
  const query = gql`
    ${FetchCurrentUser}
    # Other Queries
  `

  // TODO USER
  const data = useQuery<AuthLayerQueryData>(query, {
    query: FetchCurrentUser,
    fetchPolicy: 'cache-and-network'
  })

  return {
    authData: data || {},
    authMethods: authMethods(client)
  }
}

export default useAuthLayer
