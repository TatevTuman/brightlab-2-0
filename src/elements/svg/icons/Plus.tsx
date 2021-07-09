import React, { memo } from 'react'
import cls from 'classnames'
import { IconProps } from '~svg'

const PlusIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg
      className={cls('fill-current', className)}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.79623 0.743397C6.79623 0.33283 6.4634 0 6.05283 0C5.64227 0 5.30944 0.33283 5.30944 0.743396L5.30944 5.20377L0.743397 5.20377C0.33283 5.20377 0 5.5366 0 5.94717C0 6.35773 0.33283 6.69056 0.743397 6.69056H5.30944L5.30943 11.2566C5.30943 11.6672 5.64226 12 6.05283 12C6.4634 12 6.79623 11.6672 6.79623 11.2566L6.79623 6.69057H11.2566C11.6672 6.69057 12 6.35774 12 5.94717C12 5.5366 11.6672 5.20377 11.2566 5.20377L6.79623 5.20377L6.79623 0.743397Z"
        fill=""
      />
    </svg>
  )
}

export default memo(PlusIcon)
