import { useReactiveVar } from '@apollo/client'
import { CacheModal } from '@types'
import { drawersVar } from '@cache'

type UseDrawerResult = {
  drawer: CacheModal | null
  openDrawer: (state?: Record<string, any>) => void
  closeDrawer: () => void
}

const useDrawer = (drawerName: string): UseDrawerResult => {
  const drawers = useReactiveVar(drawersVar)
  const drawer = drawers.find(({ name }) => name === drawerName) || null

  // Modals without current drawer
  const drawersWithoutCurrent = drawers.filter(({ name }) => name !== drawerName)

  // Update drawers with filtered array and new drawer pushed
  const openDrawer = (state?: Record<string, any>) => {
    // Add drawer to cache
    drawersVar([...drawersWithoutCurrent, { name: drawerName, state }])

    // After 100ms start animation
    setTimeout(() => {
      // Find drawer
      const drawerElement = document.getElementById(drawerName)
      if (!drawerElement) return

      // Start animation
      drawerElement.setAttribute('data-opened', 'true')
      // Add esc event listener
      window.addEventListener('keydown', onEscKeyDown, false)
    }, 100)
  }

  // Update drawers with filtered array
  const closeDrawer = () => {
    // Find drawer
    const drawerElement = document.getElementById(drawerName)

    if (drawerElement) {
      // Start animation
      drawerElement.setAttribute('data-opened', 'false')
      // Remove esc listener
      window.removeEventListener('keydown', onEscKeyDown, false)
    }

    // Close after animation is finished
    setTimeout(() => {
      // Remove drawer from cache
      drawersVar(drawersWithoutCurrent)
    }, 500)
  }

  const onEscKeyDown = (e: { key: string }) => e.key === 'Escape' && closeDrawer()

  return {
    drawer,
    openDrawer,
    closeDrawer
  }
}

export default useDrawer
