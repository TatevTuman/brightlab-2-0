import React, { useEffect, useState } from 'react'

export type WithToggleProps = {
  defaultToggle?: boolean
}
export type WithToggleState = boolean

export type WithTogglePropsPassed = {
  toggle: WithToggleState
  handleToggle: (forceToggle?: boolean) => void
}

export default <P,>(WrappedComponent: React.ComponentType<WithTogglePropsPassed & P>) => {
  const Toggle: React.FC<WithToggleProps & P> = props => {
    const { defaultToggle, ...parentProps } = props

    const [toggle, setToggle] = useState<WithToggleState>(false)

    useEffect(() => {
      if (defaultToggle) {
        setToggle(defaultToggle)
      }
    }, [])

    /* Handles toggle state */
    const handleToggle = (forceToggle?: boolean) => setToggle(forceToggle ?? !toggle)

    return <WrappedComponent handleToggle={handleToggle} toggle={toggle} {...(parentProps as P)} />
  }

  Toggle.defaultProps = ({} as unknown) as WithToggleProps & P

  return Toggle
}
