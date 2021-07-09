import React, { memo } from 'react'
import { IconProps } from '~svg'
import cls from 'classnames'

const LogoIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg
      className={cls(className)}
      viewBox="0 0 172 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <rect width="172" height="32" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0" transform="translate(0 -0.00166667) scale(0.00333333 0.0179167)" />
        </pattern>
        <image
          id="image0"
          width="300"
          height="56"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}

export default memo(LogoIcon)
