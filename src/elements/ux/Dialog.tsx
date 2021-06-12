import React, { Fragment, memo } from 'react'
import cls from 'classnames'
import { Dialog as DialogComponent, Transition } from '@headlessui/react'
import { Children, ClassName } from '~types'

interface DialogProps {
  className?: ClassName
  show: boolean
  children: Children
  onHide: (value: boolean) => void
}

const Dialog: React.FC<DialogProps> = props => {
  const { className, show, children, onHide } = props

  return (
    <Transition appear show={show} as={Fragment}>
      <DialogComponent
        as="div"
        className={cls('fixed inset-0 z-10 overflow-y-auto', className)}
        onClose={() => onHide(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <DialogComponent.Overlay className="fixed bg-black-1000 opacity-60 inset-0" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div tabIndex={0}>{children}</div>
          </Transition.Child>
        </div>
      </DialogComponent>
    </Transition>
  )
}

export default memo(Dialog)
