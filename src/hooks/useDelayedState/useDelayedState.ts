import { useState } from 'react'

const useDelayedState = (initial: any) => {
  const [state, setState] = useState(initial)

  const handleStateDelay = (state: any, delay?: number) => {
    if (state) {
      setState(state)
    } else {
      setTimeout(() => {
        setState(state)
      }, delay || 1000)
    }
  }

  return [state, handleStateDelay]
}

export default useDelayedState
