import React, { memo } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { LinkGetProps } from '@reach/router'
import './Link.scss'

interface LinkProps {
  to: string
  className?: string
  state?: Record<string, any>
  active?: boolean
  children: string
}

const Link: React.FC<LinkProps> = props => {
  const { to, className, state, active, children } = props

  const handleGetProps = (props: LinkGetProps) => {
    if (props.isCurrent && active) {
      return {
        className: className + ' active'
      }
    }

    return { className }
  }

  return (
    <GatsbyLink getProps={handleGetProps} to={to} state={state}>
      {children}
    </GatsbyLink>
  )
}

export default memo(Link)
