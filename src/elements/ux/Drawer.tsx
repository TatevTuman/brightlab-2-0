import React, { Fragment, memo } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import cls from 'classnames'
import { Children, ClassName } from '~types'
import { Times } from '~svg'

export type DrawerVariantType = 'primary'
export type DrawerPositionType = 'left' | 'right'

const drawerBaseVariant = 'relative flex-1 flex flex-col max-w-544 w-full bg-neutral-12'
const drawerRightVariant = 'rounded-tl-15'
const drawerLeftVariant = 'rounded-bl-15'

const getDrawerVariantClass = (variant: DrawerVariantType, position: DrawerPositionType, className?: ClassName) => {
  return cls(className, drawerBaseVariant, {
    [`${drawerRightVariant}`]: position === 'right',
    [`${drawerLeftVariant}`]: position === 'left'
  })
}

export interface DrawerProps {
  className?: ClassName
  variant?: DrawerVariantType
  position?: DrawerPositionType
  show: boolean
  onHide: (value: boolean) => void
  title?: string
  header?: Children
  buttons?: Children
  children: Children
}

const Drawer: React.FC<DrawerProps> = props => {
  const { className, variant = 'primary', position = 'right', show, onHide, title, header, buttons, children } = props

  const isRightPosition = position === 'right'

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        static
        className={cls('fixed inset-0 flex z-3', { 'justify-end': isRightPosition })}
        open={show}
        onClose={onHide}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-neutral-14 bg-opacity-70" />
        </Transition.Child>
        {isRightPosition && (
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        )}
        <Transition.Child
          as={Fragment}
          enter="transition ease-in duration-300 transform"
          enterFrom={cls({ '-translate-x-full': !isRightPosition, 'translate-x-full': isRightPosition })}
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo={cls({ '-translate-x-full': !isRightPosition, 'translate-x-full': isRightPosition })}
        >
          <div className={getDrawerVariantClass(variant, position, className)}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={cls('absolute top-24', {
                  '-right-52': !isRightPosition,
                  '-left-52': isRightPosition
                })}
              >
                <button
                  type="button"
                  className="flex items-center justify-center h-36 w-36 bg-neutral-9 text-neutral-4 rounded-6 hover:bg-neutral-7"
                  onClick={() => onHide(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <Times className="h-10 w-10" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className={'px-32 pt-26 pb-20 border-b border-neutral-9'}>
              {title && <h1 className={'text-neutral-1'}>{title}</h1>}
              {header && <>{header}</>}
            </div>
            <div className={cls('px-32 pt-24 pb-36', { 'border-b border-neutral-9': !!buttons })}>{children}</div>
            {buttons && <div className={'inline-flex justify-end px-32 py-24'}>{buttons}</div>}
          </div>
        </Transition.Child>
        {!isRightPosition && (
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        )}
      </Dialog>
    </Transition.Root>
  )
}

export default memo(Drawer)
