import React, { memo, useState } from 'react'
import { Popover } from '@elements'
import './PopoverController.scss'

export interface PopoverControllerProps {
  bottom?: boolean
  onClick?(e: MouseEvent): void
}

const PopoverController: React.FC<PopoverControllerProps> = props => {
  const { bottom } = props
  const [open, setOpen] = useState(false)
  return (
    <div className={'controller'}>
      <div className={'controller-button'} onClick={() => setOpen(!open)} data-bottom={bottom}>
        <Popover open={open} />
      </div>
    </div>
  )
}
PopoverController.defaultProps = {
  bottom: false
}

export default memo(PopoverController)
