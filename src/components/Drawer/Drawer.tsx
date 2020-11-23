import React, { memo } from 'react'
import { createPortal } from 'react-dom'
import { Children } from '@types'
import { useDrawer } from '@hooks'
import './Drawer.scss'

export interface DrawerProps {
  drawerName: string
  children: Children
}

type DrawerType = React.FC<DrawerProps> & {}

const Drawer: DrawerType = props => {
  const { drawerName, children } = props
  const { drawer: isDrawerOpened, closeDrawer } = useDrawer(drawerName)
  const container = document.getElementById('drawers')

  if (!isDrawerOpened) return null

  const DrawerComponent = memo(() => {
    return (
      <div id={drawerName} className={'drawer'} role={'complementary'}>
        <div className={'drawer-content'}>{children}</div>
      </div>
    )
  })

  DrawerComponent.displayName = drawerName

  return createPortal(<DrawerComponent />, container!)
}

export default Drawer
