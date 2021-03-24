import { useLocation, WindowLocation } from '@reach/router'

const useLocationWithState = <T>() => {
  return useLocation() as WindowLocation<T>
}

export default useLocationWithState
