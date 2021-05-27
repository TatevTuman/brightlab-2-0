import React from 'react'
import { CommonIconProps } from '../index'

const Times: React.FC<CommonIconProps> = props => {
  const { className, onClick } = props

  return (
    <svg
      className={`fill-current ${className}`}
      onClick={onClick}
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5.62073" y="0.671631" width="1" height="7" rx="0.5" transform="rotate(45 5.62073 0.671631)" fill="" />
      <rect x="6.32776" y="5.62134" width="1" height="7" rx="0.5" transform="rotate(135 6.32776 5.62134)" fill="" />
    </svg>
  )
}

export default Times
