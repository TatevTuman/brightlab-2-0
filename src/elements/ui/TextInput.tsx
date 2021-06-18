import React, { forwardRef, memo } from 'react'
import cls from 'classnames'
import { ClassName } from '~types'

export type InputVariantType = 'green'

const textInputCoreVariant =
  'inline-flex items-center justify-center px-20 py-6 font-medium rounded-4 border border-black-300 cursor-pointer transition-colors text-14 shadow'
const textInputGreenVariant = 'hover:border-green-600 focus:border-green-700'

const getTextInputVariantClass = (variant?: InputVariantType, className?: ClassName) =>
  cls(
    textInputCoreVariant,
    {
      [`${textInputGreenVariant}`]: !variant || variant === 'green'
    },
    className
  )

export interface TextInputProps {
  className?: ClassName
  name: string
  value: string
  variant?: InputVariantType
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
  onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { className, variant, children, onChange, ...rest } = props

  return (
    <input
      ref={ref}
      className={getTextInputVariantClass(variant, className)}
      onChange={e => onChange(e.currentTarget.value, e)}
      {...rest}
    >
      {children}
    </input>
  )
})

TextInput.displayName = 'TextInput'

export default memo(TextInput)
