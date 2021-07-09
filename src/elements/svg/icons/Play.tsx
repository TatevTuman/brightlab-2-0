import React, { memo } from 'react'
import { IconProps } from '~svg'
import cls from 'classnames'

const PlayIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg
      className={cls('fill-current', className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0.5 8C0.5 12.1421 3.85786 15.5 8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8ZM6.89611 5.83875C7.13998 5.70823 7.43588 5.72254 7.66603 5.87596L9.91603 7.37596C10.1247 7.51506 10.25 7.74924 10.25 8C10.25 8.25077 10.1247 8.48494 9.91603 8.62404L7.66603 10.124C7.43588 10.2775 7.13998 10.2918 6.89611 10.1613C6.65224 10.0307 6.5 9.7766 6.5 9.5V6.5C6.5 6.2234 6.65224 5.96926 6.89611 5.83875Z" 
        fill=""/>
    </svg>
  )
}

export default memo(PlayIcon)
