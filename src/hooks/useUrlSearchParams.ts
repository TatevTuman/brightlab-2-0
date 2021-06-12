import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'

interface setUrlSearchParamOptions {
  multiple?: boolean
  redirect?: string
}

const decodeUrlSearchParams = (urlSearchParams: URLSearchParams) => '?' + decodeURIComponent(urlSearchParams.toString())

const useUrlSearchParams = (query: string) => {
  const { search } = useLocation()

  const urlSearchParams = new URLSearchParams(search)

  const setUrlSearchParam = async (value: string, options?: setUrlSearchParamOptions) => {
    if (options) {
      const { multiple, redirect = '' } = options

      if (multiple) {
        /* Get query params */
        const urlSearchParamQuery = urlSearchParams.getAll(query)[0]
        /* Splits multiple values by , and Filters "" */
        const urlSearchParamsQuery =
          (urlSearchParamQuery && urlSearchParamQuery.split(',').filter(param => !!param)) || []
        /* Checks value in params */
        const isValueInUrlSearchParamsQuery = urlSearchParamsQuery.find(param => param === value)

        if (isValueInUrlSearchParamsQuery) {
          const filteredUrlSearchParamsQuery = urlSearchParamsQuery.filter(param => param !== value).join(',')
          urlSearchParams.set(query, filteredUrlSearchParamsQuery)
        } else {
          const addedUrlSearchParamsQuery = [...urlSearchParamsQuery, value].join(',')
          urlSearchParams.set(query, addedUrlSearchParamsQuery)
        }

        return navigate(redirect + decodeUrlSearchParams(urlSearchParams))
      }

      if (redirect) {
        urlSearchParams.set(query, value)
        return navigate(redirect + decodeUrlSearchParams(urlSearchParams))
      }
    }

    urlSearchParams.set(query, value)
    await navigate(decodeUrlSearchParams(urlSearchParams))
  }

  const hasUrlSearchParam = (value: string) => {
    /* Get query params */
    const urlSearchParamQuery = urlSearchParams.getAll(query)[0]
    /* Splits multiple values by , and Filters "" */
    const urlSearchParamsQuery = (urlSearchParamQuery && urlSearchParamQuery.split(',').filter(param => !!param)) || []
    /* Checks value in params */
    return !!urlSearchParamsQuery.find(param => param === value)
  }

  const getUrlSearchParam = () => urlSearchParams.getAll(query)[0]
  const getUrlSearchParams = (): Record<string, string[]> => {
    const params = {} as Record<string, any>

    urlSearchParams.forEach((value, key) => {
      params[key] = value.split(',')
    })

    return params
  }

  return {
    urlSearchParams,
    params: search,
    getUrlSearchParam,
    getUrlSearchParams,
    hasUrlSearchParam,
    setUrlSearchParam
  }
}

export default useUrlSearchParams
