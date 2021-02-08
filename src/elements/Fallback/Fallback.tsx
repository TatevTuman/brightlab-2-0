import React from 'react'
import styles from './Fallback.module.scss'

export interface FallbackProps {
  height: string
  render?: () => JSX.Element
}

const Fallback: React.FC<FallbackProps> = ({ height, render }) => {
  if (render) return render()
  return <div className={styles.fallback} style={{ height }} />
}

export default Fallback
