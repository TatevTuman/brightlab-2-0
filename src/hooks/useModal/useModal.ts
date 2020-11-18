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
  const html = document.querySelector('html')

  // Modals without current modal
  const modalsWithoutCurrent = modals.filter(({ name }) => name !== modalName)

  // Update modals with filtered array and new modal pushed
  const openModal = (state?: Record<string, any>) => {
    html!.style.overflow = 'hidden'
    modalsVar([...modalsWithoutCurrent, { name: modalName, state }])
  }
  // Update modals with filtered array
  const closeModal = () => {
    html!.style.overflow = 'auto'
    modalsVar(modalsWithoutCurrent)
  }

  return {
    modal,
    openModal,
    closeModal
  }
}

export default useModal
