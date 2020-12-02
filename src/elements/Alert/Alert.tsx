import React from 'react'
import { AlertComponentPropsWithStyle } from 'react-alert'
import styles from './Alert.module.scss'

interface AlertProps extends AlertComponentPropsWithStyle {}

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
const Alert: React.FC<AlertProps> = props => {
  const { style, options, message, close } = props

  return (
    <div className={styles.alert} data-type={options.type} style={style}>
      {message}
    </div>
  )
}

export default Alert
