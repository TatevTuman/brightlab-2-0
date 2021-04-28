import React, { memo, useRef, useState } from 'react'
import { Children } from '@types'
import {
  Popover as ReactTinyPopover,
  ArrowContainer as ReactTinyPopoverArrowContainer,
  PopoverProps as ReactTinyPopoverProps,
  PopoverPosition as ReactTinyPopoverPosition
} from 'react-tiny-popover'
import './Popover.scss'

type Trigger = 'hover' | 'click'

export interface PopoverProps {
  content: Children
  position?: Exclude<ReactTinyPopoverPosition, 'custom'>
  align?: ReactTinyPopoverProps['align']
  trigger?: Trigger
  isArrow?: boolean
  onOpen?: () => void
  onClose?: () => void
  disableCloseOnContentClick?: boolean
}

const Popover: React.FC<PopoverProps> = props => {
  const { content, children, position, align, trigger, isArrow, onOpen, onClose, disableCloseOnContentClick } = props

  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const isHoverTrigger = trigger === 'hover'
  const isClickTrigger = trigger === 'click'

  const handlePopoverToggle = () => {
    if (open) handlePopoverClose()
    else handlePopoverOpen()
  }

  const handlePopoverOpen = () => {
    setOpen(true)
    onOpen && onOpen()
  }

  const handlePopoverClose = () => {
    setOpen(false)
    onClose && onClose()
  }

  return (
    <ReactTinyPopover
      containerClassName={'popover'}
      isOpen={open}
      positions={position && [position]}
      align={align}
      content={({ position, childRect, popoverRect }) =>
        isArrow ? (
          <ReactTinyPopoverArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={'#16161b'}
            arrowSize={10}
            // arrowStyle={{ opacity: 0.7 }}
            className="popover-arrow-container"
            arrowClassName="popover-arrow"
          >
            <div
              className={'popover-content'}
              data-arrow={isArrow}
              onClick={() => disableCloseOnContentClick && setOpen(false)}
            >
              {content}
            </div>
          </ReactTinyPopoverArrowContainer>
        ) : (
          <div
            className={'popover-content'}
            data-arrow={isArrow}
            onClick={() => disableCloseOnContentClick && setOpen(false)}
          >
            {content}
          </div>
        )
      }
      onClickOutside={() => setOpen(false)}
    >
      <div
        className={'popover-children'}
        onClick={isClickTrigger ? handlePopoverToggle : undefined}
        onMouseEnter={isHoverTrigger ? handlePopoverOpen : undefined}
        onMouseLeave={isHoverTrigger ? handlePopoverClose : undefined}
        ref={ref}
      >
        {children}
      </div>
    </ReactTinyPopover>
  )
}

Popover.defaultProps = {
  position: 'top',
  align: 'center',
  trigger: 'click',
  isArrow: true,
  disableCloseOnContentClick: true
}

export default memo(Popover)
