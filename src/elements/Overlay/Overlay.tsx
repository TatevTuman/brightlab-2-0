import React, { memo } from 'react'
import { useReactiveVar } from '@apollo/client'

import { overlayVar } from '@cache'

import './Overlay.scss'

const Overlay = () => {
  const isOpen = useReactiveVar(overlayVar)

  if (!isOpen) return null

  return <div id="overlay" className="overlay" />
}

export default memo(Overlay)
