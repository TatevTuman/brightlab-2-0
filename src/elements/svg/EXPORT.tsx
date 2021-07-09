import React, { ReactElement, useEffect, useState } from 'react'
import { ClassName } from '~types'

export type IconProps = {
  className?: ClassName
  onClick?(e: React.MouseEvent<HTMLOrSVGElement>): void
}

export type IconType =
  | 'Logo'
  | 'MiniLogo'
  | 'Search'
  | 'Times'
  | 'Check'
  | 'ArrowRight'
  | 'ArrowChevronLeft'
  | 'ArrowChevronRight'
  | 'ArrowCollapsed'
  | 'Calendar'
  | 'CalendarLinear'
  | 'Home'
  | 'People'
  | 'User'
  | 'Filter'
  | 'Plus'
  | 'ActionsVertical'
  | 'More'
  | 'PDF'
  | 'Zoom'
  | 'Play'
  | 'Pen'
  | 'Trash'
  | 'Rocket'
  | 'External'
  | 'Fire'
  | 'Cross'
  | 'Link'
  | 'Base'
  | 'Info'

import Logo from './icons/Logo'
import MiniLogo from './icons/MiniLogo'
import Search from './icons/Search'
import Times from './icons/Times'
import Check from './icons/Check'
import ArrowRight from './icons/ArrowRight'
import ArrowChevronLeft from './icons/ArrowChevronLeft'
import ArrowChevronRight from './icons/ArrowChevronRight'
import ArrowChevronDown from './icons/ArrowChevronDown'
import ArrowCollapsed from './icons/ArrowCollapsed'
import Calendar from './icons/Calendar'
import CalendarLinear from './icons/CalendarLinear'
import Home from './icons/Home'
import People from './icons/People'
import User from './icons/User'
import Filter from './icons/Filter'
import Plus from './icons/Plus'
import ActionsVertical from './icons/ActionsVertical'
import More from './icons/More'
import PDF from './icons/PDF'
import Zoom from './icons/Zoom'
import Pen from './icons/Pen'
import Trash from './icons/Trash'
import Rocket from './icons/Rocket'
import External from './icons/External'
import Fire from './icons/Fire'

import Link from './icons/Link'
import Play from './icons/Play'
import Base from './icons/Base'
import Info from './icons/Info'

const Dynamic = (props: { icon: IconType } & IconProps) => {
  const { icon, ...otherProps } = props

  const [Icon, setIcon] = useState<ReactElement>()
  useEffect(() => {
    import(`./icons/${icon}`).then(res => {
      setIcon(res.default)
    })
  }, [])

  return Icon ? React.createElement(Icon.type, otherProps) : null
}

export {
  MiniLogo,
  Logo,
  Search,
  Times,
  Check,
  ArrowRight,
  ArrowChevronLeft,
  ArrowChevronRight,
  ArrowChevronDown,
  ArrowCollapsed,
  Calendar,
  CalendarLinear,
  Home,
  People,
  User,
  Filter,
  Plus,
  Link,
  Base,
  ActionsVertical,
  More,
  PDF,
  Zoom,
  Play,
  Pen,
  Trash,
  Rocket,
  External,
  Fire,
  Info,
  Dynamic
}
