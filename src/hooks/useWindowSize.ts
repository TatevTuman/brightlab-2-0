import { useEffect, useState } from 'react'
import { Breakpoint, BreakpointName } from '~types'
import { enumToOptions } from '~utils'

interface UseWindowSizeResult {
  width: number
  height: number
  breakpoint?: BreakpointName
  toRender: boolean
}

const useWindowSize = (breakpointsToRender?: BreakpointName[]): UseWindowSizeResult => {
  const isClient = typeof window === 'object'

  const getSize = (): { width: number; height: number } => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    }
  }

  const getBreakpoint = (width: number): BreakpointName | undefined =>
    enumToOptions(Breakpoint).find(({ value }) => +value >= width)?.label as BreakpointName

  const initialWindowSize = getSize()
  const initialWindowBreakpoint = getBreakpoint(initialWindowSize.width)

  const [windowSize, setWindowSize] = useState(initialWindowSize)
  const [windowBreakpoint, setWindowBreakpoint] = useState<BreakpointName | undefined>(initialWindowBreakpoint)

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
