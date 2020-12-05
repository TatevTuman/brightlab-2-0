import React, { useState, useEffect, CSSProperties } from 'react'
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

interface LoaderProps {
  color?: string
  height?: number
  radius?: number
  secondaryColor?: string
  timeout?: number // in milliseconds
  type?: LoaderTypes
  visible?: boolean | string
  width?: number
  className?: string
  style?: CSSProperties
  noMessage?: string
}

const Loader: React.FC<LoaderProps> = props => {
  const { noMessage, ...otherProps } = props
  const [loaded, handleLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      handleLoading(true)
    }, 5000)
  }, [])

  return (
    <div className={styles.loader}>
      <LoaderComponent {...otherProps} />
      {loaded && <em>{noMessage}</em>}
    </div>
  )
}

Loader.defaultProps = {
  type: 'Triangle',
  color: 'var(--primary)',
  height: 60,
  width: 60,
  timeout: 5000,
  noMessage: 'Failed to find'
}

export default Loader
