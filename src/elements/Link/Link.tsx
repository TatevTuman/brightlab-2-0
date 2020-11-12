import React, { memo } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { LinkGetProps } from '@reach/router'
import { Children } from '@types'
import styles from './Link.module.scss'

export interface LinkProps {
  to: string
  className?: string
  state?: Record<string, any>
  active?: boolean
  underlined?: boolean
  children: Children
}

const Link: React.FC<LinkProps> = props => {
  const { to, state, active, underlined, children } = props

  const handleGetProps = (linkProps: LinkGetProps) => {
    return {
      className: styles.link + ' ' + props.className
    }
  }

  return (
    <GatsbyLink getProps={handleGetProps} data-active={active} data-underlined={underlined} to={to} state={state}>
      {children}
    </GatsbyLink>
  )
}

Link.defaultProps = {
  className: ''
}

export default memo(Link)
