import React, { memo } from 'react'
import { Children } from '@types'
import styles from '../../Form.module.scss'

export interface FormItemProps {
  children: Children
  justify?: string
}

const FormItem: React.FC<FormItemProps> = ({ children, justify }) => {
  const justifyContent = justify

  return (
    <div className={styles.formItem} style={{ justifyContent }}>
      {children}
    </div>
  )
}

export default memo(FormItem)
