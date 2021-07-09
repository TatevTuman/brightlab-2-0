import React, { memo, useState } from 'react'
import { Popover, PopoverProps } from '~ux'
import { Children, ClassName } from '~types'
import cls from 'classnames'
import { MeetingCalendarChipVariantType } from './MeetingCalendarChip'

export type ContextMenuVariantType = 'primary'

const contextMenuBaseVariant = 'px-8 pt-12 pb-8 rounded-8 bg-neutral-9 text-neutral-1'

const getContextMenuVariantClass = (variant: MeetingCalendarChipVariantType, className?: ClassName) =>
  cls(className, contextMenuBaseVariant)

export interface ContextMenuProps {
  className?: ClassName
  variant?: ContextMenuVariantType
  children: (show: () => void) => Children
  panel: Children
  options?: PopoverProps['options']
}

const ContextMenu: React.FC<ContextMenuProps> = props => {
  const { className, variant = 'primary', children, panel, options } = props

  const [show, setShow] = useState(false)

  return (
    <Popover
      options={options}
      show={show}
      onHide={setShow}
      panel={<div className={getContextMenuVariantClass(variant, className)}>{panel}</div>}
    >
      {children(() => setShow(!show))}
    </Popover>
  )
}

export default memo(ContextMenu)
