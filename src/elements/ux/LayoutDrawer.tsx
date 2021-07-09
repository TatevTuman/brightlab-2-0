import React, { Fragment, memo, useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { Children, ClassName } from '~types'
import * as Icon from '~svg'
import cls from 'classnames'
import { useWindowSize } from '~hooks'

export type LayoutDrawerVariantType = 'primary'
export type LayoutDrawerPositionType = 'left' | 'right'
export type LayoutDrawerSizeType = 'md' | 'sm'

const layoutDrawerBaseVariant =
  'relative h-full flex-1 flex flex-col w-full bg-neutral-12 rounded-10 overflow-y-scroll'

const layoutDrawerMdSize = 'max-w-420 p-0'
const layoutDrawerSmSize = 'max-w-362 pt-46 pb-20 pl-32 pr-26'

const getLayoutDrawerVariantClass = (variant: LayoutDrawerVariantType, size: LayoutDrawerSizeType, className?: ClassName) => {
  return cls(className, layoutDrawerBaseVariant, {
    [`${layoutDrawerMdSize}`]: size === 'md',
    [`${layoutDrawerSmSize}`]: size === 'sm'
  })
}

export interface LayoutDrawerProps {
  className?: ClassName
  variant?: LayoutDrawerVariantType
  size?: LayoutDrawerSizeType
  position?: LayoutDrawerPositionType
  show: boolean
  onHide?: (value: boolean) => void
  children: Children
}

const LayoutDrawer: React.FC<LayoutDrawerProps> = props => {
  const { className, variant = 'primary', position = 'right', size = 'sm', show, onHide, children } = props

  const isRightPosition = position === 'right'

  const windowSize = useWindowSize()
  const layoutDrawerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { current: layoutDrawer } = layoutDrawerRef

    if (layoutDrawer) {
      const windowHeight = window.innerHeight
      const { y } = layoutDrawer.getBoundingClientRect()
      const layoutDrawerHeight = windowHeight - y

      layoutDrawer.style.height = layoutDrawerHeight - 16 + 'px'
    }
  }, [layoutDrawerRef, windowSize])

  return (
    <div className={'relative'} ref={layoutDrawerRef}>
      <Transition
        as={Fragment}
        show={show}
        enter="transition ease duration-300 transform"
        enterFrom={cls('opacity-0', { '-translate-x-full': !isRightPosition, 'translate-x-full': isRightPosition })}
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-out duration-300 transform"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo={cls('opacity-0', { '-translate-x-full': !isRightPosition, 'translate-x-full': isRightPosition })}
      >
        <div className={getLayoutDrawerVariantClass(variant, size, className)}>
          {children}
          {
            onHide && 
            <Icon.Times className={'w-12 h-12 neutral-icon absolute top-16 right-16'} onClick={() => onHide(false)} />
          }
        </div>
      </Transition>
    </div>
  )
}

export default memo(LayoutDrawer)
