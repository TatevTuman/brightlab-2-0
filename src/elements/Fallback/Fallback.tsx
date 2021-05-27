import React, { memo } from 'react'

export interface FallbackProps {
  height: string
}

const Fallback: React.FC<FallbackProps> = ({ height }) => {
  return <div className={'fallback'} style={{ height }} />
}

export default memo(Fallback)
