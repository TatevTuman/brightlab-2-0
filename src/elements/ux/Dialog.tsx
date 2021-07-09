import React, { Fragment, memo } from 'react'
import cls from 'classnames'
import { Dialog as DialogComponent, Transition } from '@headlessui/react'
import { Children, ClassName } from '~types'

type DialogPositionType = 'default' | 'center'

export interface DialogProps {
  className?: ClassName
  show: boolean
  children: Children
  onHide: (value: boolean) => void
  position?: DialogPositionType
}

const Dialog: React.FC<DialogProps> = props => {
  const { className, show, children, onHide, position = 'default' } = props

  return (
    <Transition appear show={show} as={Fragment}>
      <DialogComponent
        as="div"
        className={cls('fixed inset-0 z-4 overflow-y-auto', className)}
        onClose={() => onHide(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <DialogComponent.Overlay className={cls('fixed inset-0', { 'bg-black opacity-60 inset-0': position === 'center' })} />
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <div 
            className={cls({'inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl': position === 'center'})}
            tabIndex={0}>
            {children}
          </div>
        </div>
      </DialogComponent>
    </Transition>
  )
}

export default memo(Dialog)
