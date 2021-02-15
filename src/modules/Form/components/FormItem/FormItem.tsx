import React, { memo } from 'react'
import { Children } from '@types'
import '../../Form.scss'

export interface FormItemProps {
  children: Children
  justify?: string
  margin?: string
}

const FormItem: React.FC<FormItemProps> = props => {
  const { children, justify, margin } = props
  const justifyContent = justify

  return (
    <div className={'form-item'} style={{ justifyContent, margin }}>
      {children}
    </div>
  )
}

export default memo(FormItem)
