import React, { memo } from 'react'
import { IconProps } from '~svg'
import cls from 'classnames'

const InfoIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg className={cls('fill-current', className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...otherProps}>
      <path
        d="M8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM8 7.0625C8.51777 7.0625 8.9375 7.48223 8.9375 8V11C8.9375 11.5178 8.51777 11.9375 8 11.9375C7.48223 11.9375 7.0625 11.5178 7.0625 11V8C7.0625 7.48223 7.48223 7.0625 8 7.0625ZM8 4.25C7.48223 4.25 7.0625 4.66973 7.0625 5.1875C7.0625 5.70527 7.48223 6.125 8 6.125C8.51777 6.125 8.9375 5.70527 8.9375 5.1875C8.9375 4.66973 8.51777 4.25 8 4.25Z"
        fill=""
      />
    </svg>
  )
}

export default memo(InfoIcon)
