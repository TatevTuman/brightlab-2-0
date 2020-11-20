import { useState, useEffect } from 'react'

const useDelayEffect = (deps: any, delay?: number): boolean => {
  const [initialized, init] = useState(false)
  const [stateDeps, handleDeps] = useState(deps)

  useEffect(() => init(true), [])

  useEffect(() => {
    if (!initialized) return

    if (deps) {
      handleDeps(deps)
    } else {
      setTimeout(() => handleDeps(false), delay || 1000)
    }
  }, [deps])

  return stateDeps
}

export default useDelayEffect
