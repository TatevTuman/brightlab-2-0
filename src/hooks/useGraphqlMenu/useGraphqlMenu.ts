import { navigate } from 'gatsby'
import { useAlert } from 'react-alert'
import { useMutation, useQuery } from '@apollo/client'
import { menu as graphqlMenu } from '@graphql'
import { useRequestErrorHandler } from '@hooks'
import { MutationResponse, PaginationResponse, PaginationArgs, ResponseType, MenuType, MenuCreateType } from '@types'

type MenuMutationResponse = ResponseType<MutationResponse<MenuType>>

const useGraphqlMenu = (id?: string) => {
  const alert = useAlert()
  const handleRequestError = useRequestErrorHandler()

  const menuRequestData = useQuery<ResponseType<MenuType>, { id?: string }>(graphqlMenu.FetchMenu, {
    variables: { id }
  })

  const paginatedUserMenusRequestData = useQuery<ResponseType<PaginationResponse<MenuType>>, PaginationArgs>(
    graphqlMenu.FetchPaginatedUserMenus,
    {
      variables: { page: 1, pageSize: 20 }
    }
  )

  const [createMenuMutation] = useMutation<MenuMutationResponse, { menu: MenuCreateType }>(graphqlMenu.CreateMenu, {
    onError: error => handleRequestError(null, error)
  })

  const [updateMenuMutation] = useMutation<MenuMutationResponse, { id: string; menu: MenuCreateType }>(
    graphqlMenu.UpdateMenu,
    {
      onError: error => handleRequestError(null, error)
    }
  )

  const createMenu = async (menu: MenuCreateType) => {
    const request = await createMenuMutation({
      variables: { menu },
      refetchQueries: [],
      update: async (cache, mutationResult) => {
        const { data } = mutationResult

        if (data) {
          const {
            res: { result, successful }
          } = data

          if (successful) {
            alert.show(`Menu created!`, {
              type: 'success'
            })

            // navigate(`/menu/${result.id}/view`)
          }
        }
      }
    })

    return handleRequestError(request)
  }

  const updateMenu = async (id: string, menu: MenuType) => {
    const request = await updateMenuMutation({
      variables: { id, menu },
      refetchQueries: [],
      update: async (cache, mutationResult) => {
        const { data } = mutationResult

        if (data) {
          const {
            res: { successful }
          } = data

          if (successful) {
            alert.show(`Menu updated!`, {
              type: 'success'
            })
          }
        }
      }
    })

    return handleRequestError(request)
  }

  return {
    menu: menuRequestData,
    paginatedUserMenus: paginatedUserMenusRequestData,
    createMenu,
    updateMenu
  }
}

export default useGraphqlMenu
