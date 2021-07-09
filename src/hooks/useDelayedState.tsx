import { useState } from 'react'

const useDelayedState = <T,>(initialState: T, initialDelay?: number): [T, (state: T, delay?: number) => void] => {
  const [state, setState] = useState(initialState)

  const handleStateDelay = (state: T, delay?: number) => {
    if (state) {
      setState(state)
    } else {
      setTimeout(() => {
        setState(state)
      }, delay || initialDelay || 1000)
    }
  }

  return [state, handleStateDelay]
}

export default useDelayedState
