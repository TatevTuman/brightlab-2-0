import React, { memo } from 'react'
import { IconProps } from '~svg'
import cls from 'classnames'

const HomeIcon: React.FC<IconProps> = props => {
  const { className, ...otherProps } = props

  return (
    <svg className={cls('fill-current', className)} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...otherProps}>
      <path
        d="M16.0956 8.02428C16.0952 8.02393 16.0949 8.02359 16.0945 8.02325L9.97572 1.90466C9.71491 1.64374 9.36816 1.5 8.99931 1.5C8.63047 1.5 8.28371 1.64362 8.02279 1.90455L1.90718 8.02004C1.90512 8.0221 1.90295 8.02428 1.901 8.02634C1.36542 8.56501 1.36633 9.439 1.90375 9.9763C2.14911 10.2219 2.47321 10.3641 2.81985 10.379C2.83392 10.3804 2.84823 10.3811 2.86253 10.3811H3.10629V14.884C3.10629 15.775 3.83139 16.5 4.72254 16.5H7.11642C7.35915 16.5 7.55587 16.3033 7.55587 16.0605V12.5303C7.55587 12.1237 7.88672 11.7929 8.29333 11.7929H9.7053C10.1119 11.7929 10.4426 12.1237 10.4426 12.5303V16.0605C10.4426 16.3033 10.6395 16.5 10.8821 16.5H13.276C14.1672 16.5 14.8922 15.775 14.8922 14.884V10.3811H15.1184C15.4871 10.3811 15.8338 10.2374 16.0949 9.97652C16.6327 9.43831 16.6331 8.56284 16.0956 8.02428V8.02428Z"
        fill=""
      />
      <path
        d="M16.0954 8.02428C16.095 8.02393 16.0947 8.02359 16.0944 8.02325L9.97555 1.90466C9.71474 1.64374 9.36798 1.5 8.99914 1.5H8.99902V11.7929H9.70512C10.1117 11.7929 10.4425 12.1237 10.4425 12.5303V16.0605C10.4425 16.3033 10.6393 16.5 10.8819 16.5H13.2758C14.1671 16.5 14.892 15.775 14.892 14.884V10.3811H15.1182C15.4869 10.3811 15.8337 10.2374 16.0947 9.97652C16.6326 9.43831 16.6329 8.56284 16.0954 8.02428V8.02428Z"
        fill=""
      />
    </svg>
  )
}

export default memo(HomeIcon)