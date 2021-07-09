import React, { forwardRef, memo } from 'react'
import cls from 'classnames'
import { ClassName } from '~types'

export type TextAreaVariantType = 'primary' | 'light'

const textAreaBaseVariant =
  'w-full inline-flex items-center px-14 py-8 rounded-6 text-14 cursor-pointer transition-colors transition-shadow'
const textAreaPrimaryVariant =
  'text-neutral-2 bg-neutral-11 ring ring-neutral-9 ring-offset-neutral-11 hover:ring-neutral-4 placeholder-neutral-5 disabled:ring-neutral-11 disabled:pointer-events-none disabled:text-neutral-8 disabled:ring-neutral-9'
const textAreaLightVariant =
  'text-neutral-14 bg-neutral-1 ring ring-neutral-2 ring-offset-neutral-1 hover:ring-neutral-4 placeholder-neutral-4 disabled:bg-neutral-11 disabled:ring-neutral-4 disabled:pointer-events-none disabled:text-neutral-8 disabled:ring-neutral-2'

const getTextAreaVariantClass = (variant: TextAreaVariantType, error: boolean, className?: ClassName) => {
  const isPrimary = !variant || variant === 'primary'
  const isLight = variant === 'light'

  return cls(className, textAreaBaseVariant, {
    [`${textAreaPrimaryVariant}`]: isPrimary,
    'focus-primary-violet-ring': isPrimary && !error,
    'error-primary-ring': isPrimary && error,

    [`${textAreaLightVariant}`]: isLight,
    'focus-light-violet-ring': isLight && !error,
    'error-light-ring': isLight && error
  })
}

export type HtmlTextAreaProps = Omit<
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  'className' | 'ref' | 'prefix'
>
export interface TextAreaProps extends HtmlTextAreaProps {
  className?: ClassName
  name: string
  value?: string
  variant?: TextAreaVariantType
  error?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, variant = 'primary', error, ...rest } = props

  return (
    <label className={getTextAreaVariantClass(variant, !!error, className)}>
      <textarea
        ref={ref}
        id={rest.name}
        className={cls('flex-1', {
          'bg-neutral-11': !variant || variant === 'primary',
          'bg-neutral-1': variant === 'light'
        })}
        aria-errormessage={error}
        aria-invalid={!!error}
        data-variant={variant}
        {...rest}
      />
    </label>
  )
})

TextArea.displayName = 'TextArea'

export default memo(TextArea)
