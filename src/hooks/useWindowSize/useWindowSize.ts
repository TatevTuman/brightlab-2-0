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
    if (width <= 576) return 'mobile'
    if (width <= 768) return 'landscape'
    if (width <= 992) return 'tablet'

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

  return { ...windowSize, breakpoint: windowBreakpoint }
}

export default useWindowSize
