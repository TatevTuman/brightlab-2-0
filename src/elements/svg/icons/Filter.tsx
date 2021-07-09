import React, { memo } from 'react'
import cls from 'classnames'
import { IconProps } from '~svg'

const FilterIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg
      className={cls('fill-current', className)}
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.25 1.25C0.25 0.835786 0.585786 0.5 1 0.5H13C13.4142 0.5 13.75 0.835786 13.75 1.25C13.75 1.66421 13.4142 2 13 2H1C0.585786 2 0.25 1.66421 0.25 1.25ZM2.5 5C2.5 4.58579 2.83579 4.25 3.25 4.25H10.75C11.1642 4.25 11.5 4.58579 11.5 5C11.5 5.41421 11.1642 5.75 10.75 5.75H3.25C2.83579 5.75 2.5 5.41421 2.5 5ZM5.5 8C5.08579 8 4.75 8.33579 4.75 8.75C4.75 9.16421 5.08579 9.5 5.5 9.5H8.5C8.91421 9.5 9.25 9.16421 9.25 8.75C9.25 8.33579 8.91421 8 8.5 8H5.5Z"
        fill=""
      />
    </svg>
  )
}

export default memo(FilterIcon)
