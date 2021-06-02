import React, { ReactElement, useEffect, useState } from 'react'

export type IconProps = {
  className?: string
  onClick?(): void
}

export type IconType = 'Logo' | 'AcademicCap' | 'BookOpen' | 'BriefCase' | 'CurrencyDollar'

import Logo from './icons/Logo'
import AcademicCap from './icons/AcademicCap'
import BookOpen from './icons/BookOpen'
import BriefCase from './icons/BriefCase'
import CurrencyDollar from './icons/CurrencyDollar'

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

export { Logo, AcademicCap, BookOpen, BriefCase, CurrencyDollar, Dynamic }
