import { useEffect, useState } from 'react'

const useWindowSize = (): { width: number; height: number; breakpoint: string } => {
  const isClient = typeof window === 'object'

  const getSize = (): { width: number; height: number } => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    }
  }

  const getBreakpoint = (width: number): string => {
    if (width < 320) {
      return 'xs'
    } else if (width >= 320 && width < 720) {
      return 'sm'
    } else if (width >= 720 && width < 1024) {
      return 'md'
    }

    return 'lg'
  }

  const initialWindowSize = getSize()
  const initialWindowBreakpoint = getBreakpoint(initialWindowSize.width)

  const [windowSize, setWindowSize] = useState(initialWindowSize)
  const [windowBreakpoint, setWindowBreakpoint] = useState(initialWindowBreakpoint)

  useEffect(() => {
    if (!isClient) {
      return
    }

    const handleResize = () => {
      const nextWindowSize = getSize()
      const nextWindowBreakPoint = getBreakpoint(nextWindowSize.width)

      setWindowSize(nextWindowSize)
      setWindowBreakpoint(nextWindowBreakPoint)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { ...windowSize, breakpoint: windowBreakpoint }
}

export default useWindowSize
