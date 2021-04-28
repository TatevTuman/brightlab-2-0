import React, { CSSProperties } from 'react'
import LoaderComponent from 'react-loader-spinner'
import './Loader.scss'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

type LoaderTypes =
  | 'Audio'
  | 'BallTriangle'
  | 'Bars'
  | 'Circles'
  | 'Grid'
  | 'Hearts'
  | 'MutatingDots'
  | 'None'
  | 'NotSpecified'
  | 'Oval'
  | 'Plane'
  | 'Puff'
  | 'RevolvingDot'
  | 'Rings'
  | 'TailSpin'
  | 'ThreeDots'
  | 'Triangle'
  | 'Watch'

export interface LoaderProps {
  color?: string
  height?: number
  radius?: number
  secondaryColor?: string
  timeout?: number // in milliseconds
  type?: LoaderTypes
  width?: number
  className?: string
  style?: CSSProperties
  page?: boolean
  layer?: boolean
}

const TIMEOUT = 100000

const Loader: React.FC<LoaderProps> = props => {
  const { className, style, color, secondaryColor, page, layer, ...otherProps } = props

  return (
    <div className={'loader ' + className} style={style} data-testid={'loader'} data-page={page} data-layer={layer}>
      <LoaderComponent {...otherProps} color={`var(--${color})`} secondaryColor={`var(--${secondaryColor})`} />
    </div>
  )
}

Loader.defaultProps = {
  type: 'Oval',
  color: 'purple',
  secondaryColor: 'secondary',
  height: 60,
  width: 60,
  timeout: TIMEOUT
}

export default Loader
