import { useEffect, useState } from 'react'

const useWindowScroll = (callback?: (windowScroll: number) => void): number => {
  if (typeof document === 'undefined') return 0

  const handleWindowScroll = () => {
    const windowScroll = window.pageYOffset
    callback && callback(windowScroll)
    return windowScroll
  }

  const [windowScroll, setWindowScroll] = useState(handleWindowScroll)

  useEffect(() => {
    const handleScroll = () => {
      setWindowScroll(handleWindowScroll())
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return windowScroll
}

export default useWindowScroll
