import React from 'react'
import { AlertComponentPropsWithStyle } from 'react-alert'
import styles from './Alert.module.scss'

export interface AlertProps extends Omit<AlertComponentPropsWithStyle, 'id'> {}

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
const Alert: React.FC<AlertProps> = props => {
  const { style, options = {}, message, close } = props
  const { type } = options

  return (
    <div className={styles.alert} data-type={type} style={style} onClick={close} data-testid={'alert'}>
      {message}
    </div>
  )
}

Alert.defaultProps = {
  style: {},
  message: 'Alert message',
  close: () => null,
  options: {
    onClose: () => null,
    onOpen: () => null,
    timeout: 2000
  }
}

export default Alert
