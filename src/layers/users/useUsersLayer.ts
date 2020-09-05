import { useApolloClient, useQuery, gql, QueryResult } from '@apollo/client'
import { FetchCurrentUser } from '@graphql'
import { User } from '@types'
import usersApi, { UsersLayerApi } from './usersApi'

interface UsersLayerQueryData {
  user: User
}

interface UseUsersLayer {
  usersData: QueryResult<UsersLayerQueryData>
  usersApi: UsersLayerApi
}

const useUsersLayer = (): UseUsersLayer => {
  const client = useApolloClient()
  const query = gql`
    ${FetchCurrentUser}
  `

  const data = useQuery<UsersLayerQueryData>(query, {
    query: query,
    fetchPolicy: 'cache-and-network'
  })

  return {
    usersData: data || {},
    usersApi: usersApi(client)
  }
}

export default useUsersLayer
