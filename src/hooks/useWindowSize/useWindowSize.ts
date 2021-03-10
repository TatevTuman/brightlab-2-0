import { useEffect, useState } from 'react'
import { Breakpoint, BreakpointName, ShortBreakpointName } from '@types'

export interface UseWindowSizeOptions {
  shortBreakpoints?: boolean
}

export interface UseWindowSizeResult {
  width: number
  height: number
  breakpoint: BreakpointName | ShortBreakpointName
}

const useWindowSize = (options?: UseWindowSizeOptions): UseWindowSizeResult => {
  const isClient = typeof window === 'object'
  const { shortBreakpoints } = options || {}

  const getSize = (): { width: number; height: number } => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    }
  }

  const getBreakpoint = (width: number): BreakpointName | ShortBreakpointName => {
    if (width <= Breakpoint.mobile) return shortBreakpoints ? 'xs' : 'mobile'
    if (width <= Breakpoint.landscape) return shortBreakpoints ? 'sm' : 'landscape'
    if (width <= Breakpoint.tablet) return shortBreakpoints ? 'xs' : 'tablet'

    return shortBreakpoints ? 'lg' : 'desktop'
  }

  const initialWindowSize = getSize()
  const initialWindowBreakpoint = getBreakpoint(initialWindowSize.width)

  const [windowSize, setWindowSize] = useState(initialWindowSize)
  const [windowBreakpoint, setWindowBreakpoint] = useState(initialWindowBreakpoint)

  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      const nextWindowSize = getSize()
      setWindowSize(nextWindowSize)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const nextWindowBreakPoint = getBreakpoint(windowSize.width)
    setWindowBreakpoint(nextWindowBreakPoint)
  }, [windowSize])

  return { ...windowSize, breakpoint: windowBreakpoint }
}

export default useWindowSize
