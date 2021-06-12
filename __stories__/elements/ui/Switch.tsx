import React, { memo, forwardRef } from 'react'
import { Switch as SwitchComponent } from '@headlessui/react'
import cls from 'classnames'
import { ClassName } from '~types'

interface SwitchProps {
  className?: ClassName
  value: boolean
  onChange: (value: boolean) => void
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const { className, value, onChange } = props

  return (
    <SwitchComponent
      ref={ref}
      checked={value}
      onChange={onChange}
      className={cls(
        'relative inline-flex flex-shrink-0 h-38 w-74 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
        { 'bg-green-900': value },
        { 'bg-green-700': !value },
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cls(
          'pointer-events-none inline-block h-34 w-34 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200',
          { 'translate-x-100%': value },
          { 'translate-x-0': !value }
        )}
      />
    </SwitchComponent>
  )
})

Switch.displayName = 'Switch'

export default memo(Switch)
