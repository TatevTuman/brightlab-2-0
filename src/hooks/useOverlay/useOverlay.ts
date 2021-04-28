import { useReactiveVar } from '@apollo/client'
import { overlayVar } from '@cache'

type UseOverlayReturnType = {
  isOpen: boolean
  openOverlay: () => void
  closeOverlay: () => void
}

const useOverlay = (): UseOverlayReturnType => {
  const isOpen = useReactiveVar(overlayVar)

  // SSR check
  if (typeof window === 'undefined') {
    return {
      isOpen: false,
      openOverlay: () => null,
      closeOverlay: () => null
    }
  }

  const html = document.querySelector('html')

  const openOverlay = () => {
    html!.style.overflow = 'hidden'
    overlayVar(true)
  }

  const closeOverlay = () => {
    html!.style.overflow = 'auto'
    overlayVar(false)
  }

  return {
    isOpen,
    openOverlay,
    closeOverlay
  }
}

export default useOverlay
