import React from 'react'
import './Fallback.scss'

export interface FallbackProps {
  height: string
}

const Fallback: React.FC<FallbackProps> = ({ height }) => {
  return <div className={'fallback'} style={{ height }} />
}

export default Fallback
