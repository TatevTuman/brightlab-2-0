import React, { memo, CSSProperties } from 'react'
import LoaderComponent from 'react-loader-spinner'
import { css } from '~utils'
import { ClassName } from '~types'
import cls from 'classnames'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export type LoaderTypes =
  | 'Audio'
  | 'BallTriangle'
  | 'Bars'
  | 'Circles'
  | 'Grid'
  | 'Hearts'
  | 'Oval'
  | 'Puff'
  | 'Rings'
  | 'TailSpin'
  | 'ThreeDots'
  | 'Watch'
  | 'RevolvingDot'
  | 'Triangle'
  | 'Plane'
  | 'MutatingDots'
  | 'CradleLoader'

export interface LoaderProps {
  width?: number
  height?: number
  radius?: number
  type?: LoaderTypes
  className?: ClassName
  style?: CSSProperties
}

const Loader: React.FC<LoaderProps> = props => {
  const { className, style, type = 'Oval', ...otherProps } = props

  const width = css.pxToRem(props.width!)
  const height = css.pxToRem(props.height!)

  return (
    <div className={cls(className)} style={style} data-testid={'loader'}>
      <LoaderComponent
        color={'#F92D7A'}
        secondaryColor={'#FFCADD'}
        width={width}
        height={height}
        type={type}
        {...otherProps}
      />
    </div>
  )
}

Loader.defaultProps = {
  type: 'Oval',
  height: 60,
  width: 60
}

export default memo(Loader)
