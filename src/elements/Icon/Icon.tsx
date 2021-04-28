import React, { CSSProperties } from 'react'
import Times from './icons/times.svg'
import Arrow from './icons/arrow.svg'

import './Icon.scss'

/* ATTENTION! Sync up with @utils/storybook */
export type IconName = 'times' | 'arrow' // | 'your next icon name'

export interface IconProps {
  name: IconName
  className?: string
  style?: CSSProperties
  onClick?(): void
}

const Icon: React.FC<IconProps> = props => {
  const { name } = props

  let icon = null

  switch (name) {
    case 'times': {
      icon = <Times {...props} />
      break
    }
    case 'arrow': {
      icon = <Arrow {...props} />
      break
    }
  }

  if (!icon) return null

  return <i className={'icon'}>{icon}</i>
}

export default Icon
