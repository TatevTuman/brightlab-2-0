import React, { memo, forwardRef } from 'react'
import cls from 'classnames'
import { ClassName } from '~types'

interface RadioProps {
  className?: ClassName
  name: string
  label?: string
  value: boolean
  defaultValue?: boolean
  onChange: (value: boolean) => void
}

const Radio: React.FC<RadioProps> = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
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
          'w-16 h-16 flex items-center justify-center border border-green-1000 rounded-50% transition-colors duration-150 hover:bg-green-100',
          { 'bg-green-1000 bg-checkbox hover:bg-green-1000': value },
          className
        )}
      >
        {value && <div className={cls('w-6 h-6 bg-white rounded-50%')} />}
      </label>
    </div>
  )
})

Radio.displayName = 'Radio'

export default memo(Radio)
