import React, { memo } from 'react'
import { HomeModal } from './modals/index'

type Modal = typeof HomeModal // | Here should be next modals
type Modals = Modal[]

// Modals
const modals: Modals = [
  HomeModal
  // Here should be next modals
]

// Modals container
// It takes modalName and render necessary modal
const Modals = () => {
  return (
    <div id={'modals'}>
      {modals.map((Modal, index) => {
        return <Modal key={index} />
      })}
    </div>
  )
}

export default memo(Modals)
