import { navigate } from 'gatsby'
import React from 'react'
import { useMatch } from '@reach/router'
import {Icon, IconName} from '@elements'
import { NavigationType, NavigationItemType } from '@types'
import './Navigation.scss'

export interface NavigationItemProps extends NavigationItemType {
  activeMatch?: boolean
}

const NavigationItem: React.FC<NavigationItemProps> = props => {
  const { path, label, icon } = props
  const match = useMatch(path)

  const isUriMatched = !!match

  return (
    <li className={'navigation-list-item'} key={path} data-active={isUriMatched} onClick={() => navigate(path)}>
      <div className={'navigation-list-item-icon'}>
        <Icon name={icon as IconName} />
      </div>
      <div className={'navigation-list-item-link'}>{label}</div>
    </li>
  )
}

export interface NavigationProps {
  navigation: NavigationType
  direction?: string
  activeMatch?: boolean
}

const Navigation: React.FC<NavigationProps> = props => {
  const { navigation, direction, activeMatch } = props

  return (
    <nav className={'navigation'} role={'navigation'} data-direction={direction}>
      <ul className={'navigation-list'}>
        {navigation.map((item, index) => {
          return <NavigationItem key={item.label + index} {...item} activeMatch={activeMatch} />
        })}
      </ul>
    </nav>
  )
}

export default Navigation
