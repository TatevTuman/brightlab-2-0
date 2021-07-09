import React, { memo } from 'react'
import { IconProps } from '~svg'
import cls from 'classnames'

const ArrowRightIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg
      className={cls('fill-current', className)}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.96967 13.7197C8.67678 14.0126 8.67678 14.4874 8.96967 14.7803C9.26256 15.0732 9.73744 15.0732 10.0303 14.7803L15.2803 9.53033C15.3562 9.45441 15.4125 9.36627 15.449 9.27224C15.4774 9.1995 15.4947 9.12125 15.499 9.03953C15.5003 9.0132 15.5003 8.9868 15.499 8.96047C15.4947 8.87875 15.4774 8.8005 15.449 8.72776C15.4125 8.63373 15.3562 8.54559 15.2803 8.46967L10.0303 3.21967C9.73744 2.92678 9.26256 2.92678 8.96967 3.21967C8.67678 3.51256 8.67678 3.98744 8.96967 4.28033L12.9393 8.25L4.24999 8.25C3.83577 8.25 3.49999 8.58579 3.49999 9C3.49999 9.41421 3.83577 9.75 4.24999 9.75L12.9393 9.75L8.96967 13.7197Z"
        fill=""
      />
    </svg>
  )
}

export default memo(ArrowRightIcon)
