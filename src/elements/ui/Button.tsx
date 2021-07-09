import React, { forwardRef, memo } from 'react'
import cls from 'classnames'
import { Children, ClassName } from '~types'
import { Loader } from '~ux'

export type ButtonVariantType = 'primary' | 'neutral' | 'violet' | 'red' | 'inline'
export type ButtonSizeType = 'lg' | 'md' | 'sm'

const buttonLgSize = 'py-9 px-16'
const buttonMdSize = 'py-8 px-14'
const buttonSmSize = 'py-5 px-8'
const buttonBaseVariant =
  'h-fit inline-flex items-center justify-center rounded-8 text-14 font-bold border cursor-pointer transition-colors select-none'
const buttonPrimaryVariant =
  'text-neutral-1 bg-primary-4 border-primary-4 hover:bg-primary-3 hover:border-primary-3 active:bg-primary-5 active:border-primary-5 disabled:bg-neutral-5 disabled:border-neutral-5 disabled:text-neutral-4 disabled:pointer-events-none'
const buttonNeutralVariant =
  'text-neutral-1 bg-neutral-9 border-neutral-9 hover:bg-neutral-7 hover:border-neutral-7 active:bg-neutral-9 active:border-neutral-9 active:text-neutral-2 disabled:bg-neutral-9 disabled:border-neutral-9 disabled:text-neutral-5 disabled:pointer-events-none'
const buttonVioletVariant =
  'text-violet-3 bg-violet-6 border-violet-6 hover:bg-violet-5 hover:border-violet-5 active:bg-violet-5 active:border-violet-5 active:text-violet-2 disabled:bg-neutral-12 disabled:border-neutral-12 disabled:text-neutral-5 disabled:pointer-events-none'
const buttonRedVariant =
  'text-red-1 bg-red-4 border-red-4 hover:bg-red-2 hover:border-red-2 hover:text-neutral-1 active:bg-red-4 active:border-red-4 active:text-neutral-1 disabled:bg-neutral-12 disabled:border-neutral-12 disabled:text-neutral-5 disabled:pointer-events-none'
const buttonInlineVariant =
  'border-none text-neutral-3 hover:text-primary-4 active:text-primary-5 disabled:text-neutral-7 disabled:pointer-events-none'

const getButtonVariantClass = (variant: ButtonVariantType, size: ButtonSizeType, className?: ClassName) => {
  const isInline = variant === 'inline'

  return cls(className, buttonBaseVariant, {
    [`${buttonLgSize}`]: !isInline && size === 'lg',
    [`${buttonMdSize}`]: (!isInline && !size) || size === 'md',
    [`${buttonSmSize}`]: !isInline && size === 'sm',
    [`${buttonPrimaryVariant}`]: variant === 'primary',
    [`${buttonNeutralVariant}`]: !variant || variant === 'neutral',
    [`${buttonVioletVariant}`]: variant === 'violet',
    [`${buttonRedVariant}`]: variant === 'red',
    [`${buttonInlineVariant}`]: isInline
  })
}

export type HtmlButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'className'
>
export interface ButtonProps extends HtmlButtonProps {
  className?: ClassName
  children: Children
  variant?: ButtonVariantType
  loading?: boolean
  size?: ButtonSizeType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant = 'neutral', size = 'md', children, loading, ...rest } = props

  return (
    <button ref={ref} className={getButtonVariantClass(variant, size, className)} {...rest}>
      {loading ? <Loader width={22} height={22} /> : children}
    </button>
  )
})

Button.displayName = 'Button'

export default memo(Button)
