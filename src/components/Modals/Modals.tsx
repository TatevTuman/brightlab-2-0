import loadable from '@loadable/component'
import React, { memo } from 'react'

const HomeModal = loadable(() => import('./HomeModal/HomeModal'))
// here should be next modals

type Modal = typeof HomeModal // | here should be next modals
type Modals = Modal[]

// Modals
const modals: Modals = [
  HomeModal
  // here should be next modals
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
