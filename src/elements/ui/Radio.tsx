import React, { memo, forwardRef } from 'react'
import cls from 'classnames'
import { ClassName } from '~types'

type RadioVariantType = 'primary'
type RadioDirectionType = 'left' | 'right'
type RadioColorType = 'normal' | 'violet'

const radioBaseVariant = 'w-16 h-16 flex items-center justify-center border rounded-50% transition-colors hover:bg-neutral-2'

const radioBoxedVariant = 'p-16 border border-solid rounded-8 mb-8'

const getRadioWrapperVariantClass = (variant: RadioVariantType, outlined: boolean, color: RadioColorType, value: boolean) => 
  cls(
    'items-center', 
    outlined ? 'flex': 'inline-flex',
    {
      [`${radioBoxedVariant}`]: outlined,
      ['border-violet-3.5 bg-neutral-1.25']: outlined && color === 'violet' && value,
      ['border-neutral-2 bg-white']: outlined && color === 'violet' && !value
    }
  )


const getRadioVariantClass = (variant: RadioVariantType, value: boolean, className?: ClassName) =>
  cls(
    className,
    radioBaseVariant,
    { 'bg-neutral-1 border-neutral-2': !value },
    { 'bg-checkbox bg-violet-3 border-violet-3': value }
  )

export type RadioHtmlInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'className' | 'value' | 'defaultValue' | 'onChange' | 'ref'
>
export interface RadioProps extends RadioHtmlInputProps {
  className?: ClassName
  color?: RadioColorType
  variant?: RadioVariantType
  outlined?: boolean
  name: string
  label?: string
  value: boolean
  defaultValue?: boolean
  direction?: RadioDirectionType
  onChange: (value: boolean) => void
}

const Radio: React.FC<RadioProps> = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { className, color = 'normal', variant = 'primary', outlined = false, direction = 'left', name, label, value, defaultValue, onChange, ...rest } = props

  return (
    <div className={getRadioWrapperVariantClass(variant, outlined, color, value)}>
      {
        direction === 'left' && 
        <label htmlFor={name} className={getRadioVariantClass(variant, value, className)}>
          <div className={cls('w-6 h-6 bg-white rounded-50%')} />
        </label>
      }
      {label && (
        <label className={cls('mr-8', {'text-violet-4.5': color === 'violet' && value})} htmlFor={name}>
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
        onChange={() => onChange(!value)}
        {...rest}
      />
      {
        direction === 'right' &&
        <label htmlFor={name} className={getRadioVariantClass(variant, value, className)}>
          {value && <div className={cls('w-6 h-6 bg-white rounded-50%')} />}
        </label>
      }
    </div>
  )
})

Radio.displayName = 'Radio'

export default memo(Radio)
