import React, { memo } from 'react'
import { AlertComponentProps, AlertType } from 'react-alert'
import cls from 'classnames'
import { ClassName } from '~types'

export type AlertVariantType = AlertType
const getAlertVariantClass = (variant?: AlertVariantType, className?: ClassName) =>
  cls(
    'w-fit min-h-40 flex font-medium items-center justify-center rounded-5 text-neutral-1 px-30 mt-20 mr-20',
    {
      'bg-green-2': !variant || variant === 'success',
      'bg-orange-2': variant === 'info',
      'bg-red-1': variant === 'error'
    },
    className
  )

export interface AlertProps extends Omit<AlertComponentProps, 'id'> {
  className?: ClassName
}

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
const Alert: React.FC<AlertProps> = props => {
  const { className, options = {}, message, close } = props
  const { type: variant } = options

  return (
    <div className={getAlertVariantClass(variant, className)} onClick={close} data-testid={'alert'}>
      {message}
    </div>
  )
}

Alert.defaultProps = {
  message: 'Alert message',
  close: () => null,
  options: {
    onClose: () => null,
    onOpen: () => null,
    timeout: 2000
  }
}

export default memo(Alert)
