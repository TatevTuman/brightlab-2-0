import React, { memo } from 'react'
import { IconProps } from '~svg'
import cls from 'classnames'

const ActionsVerticalIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg
      className={cls('fill-current', className)}
      viewBox="0 0 4 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.666992 10.6667C0.666992 11.403 1.26395 12 2.00033 12C2.73671 12 3.33366 11.403 3.33366 10.6667C3.33366 9.93029 2.7367 9.33333 2.00033 9.33333C1.26395 9.33333 0.666992 9.93029 0.666992 10.6667ZM0.666992 6C0.666992 6.73638 1.26395 7.33333 2.00033 7.33333C2.7367 7.33333 3.33366 6.73638 3.33366 6C3.33366 5.26362 2.7367 4.66667 2.00033 4.66667C1.26395 4.66667 0.666992 5.26362 0.666992 6ZM2.00033 2.66667C1.26395 2.66667 0.666992 2.06971 0.666992 1.33333C0.666992 0.596954 1.26395 -2.60937e-08 2.00032 -5.82819e-08C2.7367 -9.047e-08 3.33366 0.596954 3.33366 1.33333C3.33366 2.06971 2.7367 2.66667 2.00033 2.66667Z"
        fill=""
      />
    </svg>
  )
}

export default memo(ActionsVerticalIcon)
