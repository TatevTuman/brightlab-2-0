import { MutableRefObject, RefObject, useEffect } from 'react'

type Element = HTMLElement | HTMLDivElement

const useOutsideClick = (
  ref: RefObject<Element> | MutableRefObject<Element>,
  callback: (arg: MouseEvent | TouchEvent) => void
) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref?.current || ref.current.contains((event.target as Node) || null)) {
          return
        }

        callback(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and callback to effect dependencies
    // It's worth noting that because passed in callback is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap callback in useCallback before ...
    // ... passing it into this hook.
    [ref, callback]
  )
}

export default useOutsideClick
