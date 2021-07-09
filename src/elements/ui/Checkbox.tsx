import React, { memo, forwardRef } from 'react'
import cls from 'classnames'
import { ClassName } from '~types'
import * as Icon from '~svg'

type CheckboxVariantType = 'primary'
const checkboxBaseVariant = 'w-16 h-16 border rounded-4 transition-colors hover:bg-neutral-2'

const getCheckboxVariantClass = (variant: CheckboxVariantType, value: boolean, className?: ClassName) =>
  cls(className, checkboxBaseVariant,
      { 'bg-neutral-1 border-neutral-2': !value && variant === 'primary' },
      { 'bg-checkbox bg-violet-3 border-violet-3': value && variant === 'primary'}
  )

export type CheckboxHtmlInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'className' | 'value' | 'defaultValue' | 'ref'
>
export interface CheckboxProps extends CheckboxHtmlInputProps {
  className?: ClassName
  variant?: CheckboxVariantType
  name: string
  label?: string
  value: boolean
  defaultValue?: boolean
  outlined?: boolean
}

const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { className, variant = 'primary', name, label, value, defaultValue, outlined, ...rest } = props

  return (
    <div className={'inline-flex'}>
      {label && (
        <label className={'mr-8'} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={'hidden'}
        id={name}
        name={name}
        ref={ref}
        type="checkbox"
        checked={value}
        defaultChecked={defaultValue}
        {...rest}
      />
      <label htmlFor={name} className={outlined ? ('w-16 h-16 bg-primary-6 border-2 border-primary-4 rounded-8 transition-colors hover:bg-primary-6 ' + className) : getCheckboxVariantClass(variant, value, className)}>
        {value && <Icon.Check className={outlined ? 'text-primary-4' : 'text-white'} />}
      </label>
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default memo(Checkbox)
