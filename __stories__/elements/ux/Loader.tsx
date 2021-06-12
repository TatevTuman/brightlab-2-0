import React, { memo, CSSProperties } from 'react'
import LoaderComponent from 'react-loader-spinner'
import { css } from '~utils'
import cls from 'classnames'
import './Loader.scss'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { ClassName } from '~types'

type LoaderTypes =
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
  type: LoaderTypes
  className?: ClassName
  style?: CSSProperties
}

const Loader: React.FC<LoaderProps> = props => {
  const { className, style, ...otherProps } = props

  const width = css.pxToRem(props.width!)
  const height = css.pxToRem(props.height!)

  return (
    <div className={cls('', className)} style={style} data-testid={'loader'}>
      <LoaderComponent width={width} height={height} {...otherProps} />
    </div>
  )
}

Loader.defaultProps = {
  type: 'Oval',
  height: 60,
  width: 60
}

export default memo(Loader)
