import React, { CSSProperties } from 'react'

import Logo from './icons/logo.svg'
import Actions from './icons/actions.svg'
import ActionsBordered from './icons/actions-bordered.svg'
import Arrow from './icons/arrow.svg'
import Calendar from './icons/calendar.svg'
import Camera from './icons/camera.svg'
import Clock from './icons/clock.svg'
import EmailSign from './icons/email-sign.svg'
import Incoming from './icons/incoming.svg'
import Like from './icons/like.svg'
import List from './icons/list.svg'
import LongArrow from './icons/long-arrow.svg'
import Pencil from './icons/pencil.svg'
import Person from './icons/person.svg'
import PersonBordered from './icons/person-bordered.svg'
import Plus from './icons/plus.svg'
import PlusBordered from './icons/plus-bordered.svg'
import PlusFilled from './icons/plus-filled.svg'
import Search from './icons/search.svg'
import SearchBordered from './icons/search-bordered.svg'
import SearchFilled from './icons/search-filled.svg'
import Settings from './icons/settings.svg'
import Times from './icons/times.svg'
import TimesBordered from './icons/times-bordered.svg'
import LinkedinFilled from './icons/linkedin-filled.svg'
import SSoFilled from './icons/sso-filled.svg'
import Google from './icons/google.svg'

import './Icon.scss'

/* Sync up with @utils/storybook */
export type IconName =
  | 'logo'
  | 'actions'
  | 'actions-bordered'
  | 'arrow'
  | 'calendar'
  | 'camera'
  | 'clock'
  | 'email-sign'
  | 'incoming'
  | 'like'
  | 'list'
  | 'long-arrow'
  | 'pencil'
  | 'person'
  | 'person-bordered'
  | 'plus'
  | 'plus-bordered'
  | 'plus-filled'
  | 'search'
  | 'search-bordered'
  | 'search-filled'
  | 'settings'
  | 'times'
  | 'times-bordered'
  | 'linkedin-filled'
  | 'sso-filled'
  | 'google'

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
    case 'logo': {
      icon = <Logo {...props} />
      break
    }
    case 'actions': {
      icon = <Actions {...props} />
      break
    }
    case 'actions-bordered': {
      icon = <ActionsBordered {...props} />
      break
    }
    case 'arrow': {
      icon = <Arrow {...props} />
      break
    }
    case 'calendar': {
      icon = <Calendar {...props} />
      break
    }
    case 'camera': {
      icon = <Camera {...props} />
      break
    }
    case 'clock': {
      icon = <Clock {...props} />
      break
    }
    case 'email-sign': {
      icon = <EmailSign {...props} />
      break
    }
    case 'incoming': {
      icon = <Incoming {...props} />
      break
    }
    case 'like': {
      icon = <Like {...props} />
      break
    }
    case 'list': {
      icon = <List {...props} />
      break
    }
    case 'long-arrow': {
      icon = <LongArrow {...props} />
      break
    }
    case 'pencil': {
      icon = <Pencil {...props} />
      break
    }
    case 'person': {
      icon = <Person {...props} />
      break
    }
    case 'person-bordered': {
      icon = <PersonBordered {...props} />
      break
    }
    case 'plus': {
      icon = <Plus {...props} />
      break
    }
    case 'plus-bordered': {
      icon = <PlusBordered {...props} />
      break
    }
    case 'plus-filled': {
      icon = <PlusFilled {...props} />
      break
    }
    case 'search': {
      icon = <Search {...props} />
      break
    }
    case 'search-bordered': {
      icon = <SearchBordered {...props} />
      break
    }
    case 'search-filled': {
      icon = <SearchFilled {...props} />
      break
    }
    case 'settings': {
      icon = <Settings {...props} />
      break
    }
    case 'times': {
      icon = <Times {...props} />
      break
    }
    case 'times-bordered': {
      icon = <TimesBordered {...props} />
      break
    }
    case 'linkedin-filled': {
      icon = <LinkedinFilled {...props} />
      break
    }
    case 'sso-filled': {
      icon = <SSoFilled {...props} />
      break
    }
    case 'google': {
      icon = <Google {...props} />
      break
    }
  }

  if (!icon) return null

  return <i className={'icon'}>{icon}</i>
}

export default Icon
