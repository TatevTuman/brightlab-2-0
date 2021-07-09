import React, { memo, useEffect, useRef, useState } from 'react'
import { Popover as PopoverElement, Transition } from '@headlessui/react'
import { usePopper, PopperProps } from 'react-popper'
import { useClickAway, useFirstMountState } from '~hooks'
import { Children } from '~types'

export interface PopoverProps {
  show: boolean
  onHide: (value: boolean) => void
  children: Children
  panel: Children
  options?: Omit<PopperProps<any>, 'children' | 'innerRef' | 'referenceElement'>
}

const Popover: React.FC<PopoverProps> = props => {
  const { show, onHide, children, panel, options } = props

  const [_, setPosition] = useState(false)
  const referenceElement = useRef<HTMLDivElement | null>(null)
  const popperElement = useRef<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(referenceElement?.current, popperElement?.current, options)

  const popoverRef = useRef<HTMLDivElement | null>(null)
  useClickAway(popoverRef, () => onHide && onHide(false))

  const isFirstMount = useFirstMountState()

  useEffect(() => {
    if (isFirstMount) setPosition(true)
  }, [isFirstMount])

  return (
    <PopoverElement className={'z-1'}>
      <div ref={popoverRef}>
        <PopoverElement.Button as={'div'} ref={referenceElement} className={''}>
          {children}
        </PopoverElement.Button>
        <PopoverElement.Panel static ref={popperElement} style={styles.popper} {...attributes.popper}>
          <Transition
            as={'div'}
            show={show}
            enter="transform transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-10"
            enterTo="opacity-100 translate-y-0"
            leave="transform transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-10"
          >
            {panel}
          </Transition>
        </PopoverElement.Panel>
      </div>
    </PopoverElement>
  )
}

export default memo(Popover)
