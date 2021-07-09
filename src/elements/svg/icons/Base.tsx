import React, { memo } from 'react'
import { IconProps } from '~svg'
import cls from 'classnames'

const BaseIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg className={cls('fill-current', className)}  width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...otherProps}>
      <circle cx="4.5" cy="4.5" r="4.5" fill=""/>
    </svg>
  )
}

export default memo(BaseIcon)