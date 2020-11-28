import { useReactiveVar } from '@apollo/client'
import { CacheModal } from '@types'
import { modalsVar } from '@cache'

type UseModalResult = {
  modal: CacheModal | null
  openModal: (state?: Record<string, any>) => void
  closeModal: () => void
}

const useModal = (modalName: string): UseModalResult => {
  const modals = useReactiveVar(modalsVar)
  const modal = modals.find(({ name }) => name === modalName) || null

  // SSR check
  if (typeof window === 'undefined') {
    return {
      modal,
      openModal: () => null,
      closeModal: () => null
    }
  }

  const html = document.querySelector('html')
  // Modals without current modal
  const modalsWithoutCurrent = modals.filter(({ name }) => name !== modalName)

  // Update modals with filtered array and new modal pushed
  const openModal = (state?: Record<string, any>) => {
    // Disable scroll
    html!.style.overflow = 'hidden'
    // Add modal to cache
    modalsVar([...modalsWithoutCurrent, { name: modalName, state }])

    // After 100ms start animation
    setTimeout(() => {
      // Find modal
      const modalElement = document.getElementById(modalName)
      if (!modalElement) return

      // Start animation
      modalElement.setAttribute('data-opened', 'true')
      // Add esc event listener
      window.addEventListener('keydown', onEscKeyDown, false)
    }, 100)
  }

  // Update modals with filtered array
  const closeModal = () => {
    //Enable scroll
    html!.style.overflow = 'auto'

    // Find modal
    const modalElement = document.getElementById(modalName)

    if (modalElement) {
      // Start animation
      modalElement.setAttribute('data-opened', 'false')
      // Remove esc listener
      window.removeEventListener('keydown', onEscKeyDown, false)
    }

    // Close after animation is finished
    setTimeout(() => {
      // Remove modal from cache
      modalsVar(modalsWithoutCurrent)
    }, 500)
  }

  const onEscKeyDown = (e: { key: string }) => e.key === 'Escape' && closeModal()

  return {
    modal,
    openModal,
    closeModal
  }
}

export default useModal
