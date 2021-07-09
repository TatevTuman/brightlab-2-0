import React, { memo } from 'react'
import { Children, ClassName } from '~types'
import cls from 'classnames'

export interface LabelFieldProps {
  className?: ClassName
  name?: string
  label?: Children
  children: Children
}

const LabelField: React.FC<LabelFieldProps> = props => {
  const { className, name, label, children } = props

  return (
    <div className={cls(className, 'mb-16')}>
      <div className="w-full inline-flex items-center justify-between mb-8">
        {label && (
          <label className="text-neutral-5" htmlFor={name}>
            {label}
          </label>
        )}
      </div>
      {children}
    </div>
  )
}

export default memo(LabelField)
