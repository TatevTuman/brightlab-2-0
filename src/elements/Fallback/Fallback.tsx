import React from 'react'
import './Fallback.scss'

export interface FallbackProps {
  height: string
  render?: () => JSX.Element
}

const Fallback: React.FC<FallbackProps> = ({ height, render }) => {
  if (render) return render()
  return <div className={'fallback'} style={{ height }} />
}

export default Fallback
