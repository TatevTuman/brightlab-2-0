import { useState, useEffect } from 'react'

const useLoadingDelay = (loading: boolean, delay?: number): boolean => {
  const [stateLoading, handleLoading] = useState(false)

  useEffect(() => {
    if (loading) handleLoading(loading)
    else setTimeout(() => handleLoading(loading), delay || 1000)
  }, [loading])

  return stateLoading
}

export default useLoadingDelay
