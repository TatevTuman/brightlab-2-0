import React, { memo } from 'react'
import { AlertComponentPropsWithStyle } from 'react-alert'
import cls from 'classnames'
import { ClassName } from '~types'

export interface AlertProps extends Omit<AlertComponentPropsWithStyle, 'id'> {
  className?: ClassName
}

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
const Alert: React.FC<AlertProps> = props => {
  const { className, style, options = {}, message, close } = props
  const { type } = options

  return (
    <div
      className={cls('w-fit min-h-40 flex font-medium items-center justify-center rounded-5 px-30', className)}
      data-type={type}
      style={style}
      onClick={close}
      data-testid={'alert'}
    >
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

export default memo(Alert)
