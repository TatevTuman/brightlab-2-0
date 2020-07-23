import { useEffect, useState } from 'react'

const useBodyScroll = (): void => {
  if (typeof document === 'undefined') return 0

  function getScroll() {
    return document.body.scrollTop
  }

  const [bodyScroll, setBodyScroll] = useState(getScroll)

  useEffect(() => {
    const handleScroll = () => {
      setBodyScroll(getScroll())
    }

    document.body.addEventListener('scroll', handleScroll)
    return () => document.body.removeEventListener('scroll', handleScroll)
  }, [])

  return bodyScroll
}

export default useBodyScroll
