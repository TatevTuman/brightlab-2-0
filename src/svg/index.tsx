import React, { ReactElement, useEffect, useState } from "react"

export type IconProps = {
  className?: string
  onClick?(): void
}

export type IconType = "Logo" | "Test"

import Test from "./icons/Test"
import Logo from "./icons/Logo"

const DynamicIcon = (props: { icon: IconType } & IconProps) => {
  const { icon, ...otherProps } = props

  const [Icon, setIcon] = useState<ReactElement>()
  useEffect(() => {
    import(`./icons/${icon}`).then(res => {
      setIcon(res.default)
    })
  }, [])

  return Icon ? React.createElement(Icon.type, otherProps) : null
}

export { Logo, Test, DynamicIcon }
