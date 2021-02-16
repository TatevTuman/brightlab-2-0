import { useEffect, useState } from 'react'

export interface UseWindowSizeResult {
  width: number
  height: number
  breakpoint: string
  toRender: boolean
}

/* Desktop > 992, Tablet > 768, Landscape > 576, Mobile > 320 */
export enum Breakpoints {
  mobile = 576,
  landscape = 768,
  tablet = 992
}

const useWindowSize = (breakpointsToRender?: string[]): UseWindowSizeResult => {
  const isClient = typeof window === 'object'

  const getSize = (): { width: number; height: number } => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    }
  }

  const getBreakpoint = (width: number): string => {
    if (width <= Breakpoints.mobile) return 'mobile'
    if (width <= Breakpoints.landscape) return 'landscape'
    if (width <= Breakpoints.tablet) return 'tablet'

    return 'desktop'
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

  const toRender = !!breakpointsToRender?.find(breakpointToRender => breakpointToRender === windowBreakpoint)

  return { ...windowSize, breakpoint: windowBreakpoint, toRender }
}

export default useWindowSize
