import React, { CSSProperties } from 'react'
import LoaderComponent from 'react-loader-spinner'
import styles from './Loader.module.scss'
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
}

const TIMEOUT = 15000

const Loader: React.FC<LoaderProps> = props => {
  const { style, ...otherProps } = props

  return (
    <div className={styles.loader} style={style} data-testid={'loader'}>
      <LoaderComponent {...otherProps} />
    </div>
  )
}

Loader.defaultProps = {
  type: 'Triangle',
  color: 'var(--primary)',
  height: 60,
  width: 60,
  timeout: TIMEOUT
}

export default Loader
