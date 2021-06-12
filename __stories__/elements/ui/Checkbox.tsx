import React, { memo, forwardRef } from 'react'
import cls from 'classnames'
import { ClassName } from '~types'
import * as Icon from '~svg'

interface CheckboxProps {
  className?: ClassName
  name: string
  label?: string
  value: boolean
  defaultValue?: boolean
  onChange: (value: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { className, name, label, value, defaultValue, onChange } = props

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
        onChange={() => onChange(!value)}
      />
      <label
        htmlFor={name}
        className={cls(
          'w-16 h-16 border border-green-1000 rounded transition-colors duration-150 hover:bg-green-100',
          { 'bg-green-1000 bg-checkbox hover:bg-green-1000': value },
          className
        )}
      >
        {value && <Icon.Check className={'text-white'} />}
      </label>
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default memo(Checkbox)
