import { ApolloError, FetchResult } from '@apollo/client'
import { MutationResponse, ResponseType } from '~types'
import { useAlert } from 'react-alert'

const useRequestErrorHandler = () => {
  const alert = useAlert()

  return <T = any>(request: FetchResult<ResponseType<MutationResponse<T>>> | null, requestError?: ApolloError) => {
    if (requestError) {
      alert.show(requestError.message, { type: 'error' })

      return null
    }

    if (request) {
      const { data } = request

      if (data) {
        const {
          res: { messages }
        } = data

        if (messages?.length) {
          const { message } = messages[0]
          alert.show(message, { type: 'error' })

          return null
        } else {
          return data.res
        }
      } else {
        alert.show('Something went wrong...', { type: 'error' })

        return null
      }
    }
  }
}

export default useRequestErrorHandler
