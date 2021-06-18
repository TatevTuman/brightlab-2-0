import React, { forwardRef, memo } from 'react'
import cls from 'classnames'
import { Children, ClassName } from '~types'

export type ButtonVariantType = 'green' | 'green-white'

const buttonCoreVariant =
  'inline-flex items-center justify-center px-20 py-6 font-medium rounded-4 border cursor-pointer transition-colors'
const buttonGreenVariant = 'border-transparent text-white bg-green-600 hover:bg-green-700'
const buttonGreenWhiteVariant =
  'text-green-600 border-green-600 bg-white hover:text-white hover:border-green-700 hover:bg-green-700'

const getButtonVariantClass = (variant?: ButtonVariantType, className?: ClassName) =>
  cls(
    buttonCoreVariant,
    {
      [`${buttonGreenVariant}`]: !variant || variant === 'green',
      [`${buttonGreenWhiteVariant}`]: variant === 'green-white'
    },
    className
  )

export interface ButtonProps {
  className?: ClassName
  children: Children
  variant?: ButtonVariantType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, children, ...rest } = props

  return (
    <button ref={ref} className={getButtonVariantClass(variant, className)} {...rest}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default memo(Button)
