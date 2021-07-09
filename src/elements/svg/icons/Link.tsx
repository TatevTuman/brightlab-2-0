import React, { memo } from 'react'
import cls from 'classnames'
import { IconProps } from '~svg'

const LinkIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg
      className={cls('fill-current', className)}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6569 5.34315C15.4853 4.17158 13.5858 4.17158 12.4142 5.34315L11 6.75736C10.6095 7.14789 9.97631 7.14789 9.58579 6.75736C9.19527 6.36684 9.19527 5.73367 9.58579 5.34315L11 3.92894C12.9526 1.97631 16.1185 1.97631 18.0711 3.92894C20.0237 5.88156 20.0237 9.04738 18.0711 11L16.6569 12.4142C16.2663 12.8047 15.6332 12.8047 15.2426 12.4142C14.8521 12.0237 14.8521 11.3905 15.2426 11L16.6569 9.58579C17.8284 8.41422 17.8284 6.51472 16.6569 5.34315ZM5.34315 16.6569C4.17158 15.4853 4.17158 13.5858 5.34315 12.4142L6.75736 11C7.14789 10.6095 7.14789 9.97631 6.75736 9.58579C6.36684 9.19527 5.73367 9.19527 5.34315 9.58579L3.92894 11C1.97632 12.9526 1.97631 16.1185 3.92894 18.0711C5.88156 20.0237 9.04738 20.0237 11 18.0711L12.4142 16.6569C12.8047 16.2663 12.8047 15.6332 12.4142 15.2426C12.0237 14.8521 11.3905 14.8521 11 15.2426L9.58579 16.6569C8.41422 17.8284 6.51472 17.8284 5.34315 16.6569ZM14.5355 8.87868C14.9261 8.48816 14.9261 7.85499 14.5355 7.46447C14.145 7.07395 13.5118 7.07395 13.1213 7.46447L7.46447 13.1213C7.07395 13.5118 7.07395 14.145 7.46447 14.5355C7.85499 14.9261 8.48816 14.9261 8.87868 14.5355L14.5355 8.87868Z"
        fill=""
      />
    </svg>
  )
}

export default memo(LinkIcon)
