import React, { memo } from 'react'
import { Children } from '@types'
import styles from '../../Form.module.scss'

export interface FormItemProps {
  children: Children
  justify?: string
  margin?: string
}

const FormItem: React.FC<FormItemProps> = props => {
  const { children, justify, margin } = props
  const justifyContent = justify

  return (
    <div className={styles.formItem} style={{ justifyContent, margin }}>
      {children}
    </div>
  )
}

export default memo(FormItem)
