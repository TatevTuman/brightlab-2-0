import React from 'react'
import { Drawer } from '@components'
import { useDrawer, useSiteMetadata } from '@hooks'
import { Link } from '@elements'
import styles from './HomeDrawer.module.scss'

export interface HomeDrawerProps {}

const HomeDrawer: React.FC<HomeDrawerProps> = props => {
  const drawerName = 'HomeDrawer'
  const { drawer, closeDrawer } = useDrawer(drawerName)
  const { navigation } = useSiteMetadata()

  return (
    <Drawer drawerName={drawerName}>
      <div className={styles.homeDrawer}>
        <nav role={'navigation'} data-direction="horizontal">
          <ul>
            {navigation.map(item => {
              const { path, label } = item

              return (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </Drawer>
  )
}

export default HomeDrawer
