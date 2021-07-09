import React, { memo } from 'react'
import { IconProps } from '~svg'
import cls from 'classnames'

const ArrowCollapsed: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg 
      className={cls('fill-current', className)}
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path 
        fillRule="evenodd" clipRule="evenodd" 
        d="M11.4209 5.46025C11.193 5.24058 11.193 4.88442 11.4209 4.66475C11.6487 4.44508 12.018 4.44508 12.2458 4.66475L16.2746 8.54967C16.4106 8.65165 16.4989 8.8138 16.5 8.99663C16.5 8.99775 16.5 8.99887 16.5 9C16.5 9.00113 16.5 9.00225 16.5 9.00337C16.4989 9.1862 16.4106 9.34835 16.2746 9.45033L12.2458 13.3352C12.018 13.5549 11.6487 13.5549 11.4209 13.3352C11.193 13.1156 11.193 12.7594 11.4209 12.5398L14.5084 9.5625H8.0625C7.75184 9.5625 7.5 9.31066 7.5 9C7.5 8.68934 7.75184 8.4375 8.0625 8.4375H14.5084L11.4209 5.46025Z" 
        fill=""/>
      <path d="M3.75 4.125V14.625" fill="" />
    </svg>
  )
}

export default memo(ArrowCollapsed)