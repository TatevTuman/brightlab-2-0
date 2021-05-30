import { useMutation } from '@apollo/client'
import { order as graphqlOrder } from '@graphql'
import { useRequestErrorHandler } from '@hooks'
import { MutationResponse, ResponseType, OrderType, OrderCreateType } from '@types'

type OrderMutationResponse = ResponseType<MutationResponse<OrderType>>

const useGraphqlOrder = () => {
  const handleRequestError = useRequestErrorHandler()

  const [createOrderMutation] = useMutation<OrderMutationResponse, { courses: OrderCreateType }>(
    graphqlOrder.CreateOrder,
    {
      onError: error => handleRequestError(null, error)
    }
  )

  const createOrder = async (courses: OrderCreateType) => {
    const request = await createOrderMutation({ variables: { courses } })

    return handleRequestError(request)
  }

  return {
    createOrder
  }
}

export default useGraphqlOrder
