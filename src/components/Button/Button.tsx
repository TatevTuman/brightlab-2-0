import React from 'react'
import './Button.scss'

interface ButtonProps {
  children: string
}

const Button: React.FC<ButtonProps> = props => {
  const { children } = props

  return <div className="button">{children}</div>
}

export default Button
