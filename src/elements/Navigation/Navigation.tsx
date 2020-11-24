import React from 'react'
import { useMatch } from '@reach/router'
import { Link } from '@elements'
import { NavigationType, NavigationItemType } from '@types'

interface NavigationItemProps extends NavigationItemType {
  activeMatch?: boolean
}

const NavigationItem: React.FC<NavigationItemProps> = props => {
  const { path, label, activeMatch } = props
  const match = useMatch(path)

  const isUriMatched = !!(activeMatch && match)

  return (
    <li key={path}>
      <Link to={path} active={isUriMatched} underlined={isUriMatched}>
        {label}
      </Link>
    </li>
  )
}

interface NavigationProps {
  navigation: NavigationType
  direction?: string
  activeMatch?: boolean
}

const Navigation: React.FC<NavigationProps> = props => {
  const { navigation, direction, activeMatch } = props

  return (
    <nav role={'navigation'} data-direction={direction}>
      <ul>
        {navigation.map((item, index) => (
          <NavigationItem key={item.label + index} {...item} activeMatch={activeMatch} />
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
