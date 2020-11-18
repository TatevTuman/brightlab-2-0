import React, { memo } from 'react'
import { Children } from '@types'
import styles from '../../Form.module.scss'

export interface FormItemProps {
  children: Children
}

const FormItem: React.FC<FormItemProps> = ({ children }) => {
  return <div className={styles.formItem}>{children}</div>
}

export default memo(FormItem)
