import React, { memo, MouseEvent } from 'react'
import { navigate } from 'gatsby'
import { useDelayEffect } from '@hooks'
import './Button.scss'

type ButtonKeyboardEvent = React.KeyboardEvent<HTMLButtonElement>
type ButtonMouseEvent = MouseEvent<HTMLButtonElement>
type ButtonEvents = ButtonKeyboardEvent | ButtonMouseEvent

export interface ButtonProps {
  children: string
  className?: string
  type?: string
  size?: string
  onClick?(): void
  disabled?: boolean
  loading?: boolean
  to?: string
  submit?: boolean
  centered?: boolean
}

const Button: React.FC<ButtonProps> = props => {
  const { className, type, size, to, children, onClick, loading, disabled, submit, centered } = props

  const classNames = `button button__${type}-${size} ${className}`
  const delayedLoading = useDelayEffect(loading!)

  const handleClick = async (e: ButtonEvents) => {
    e.stopPropagation()

    if (delayedLoading || disabled) return

    if (to) await navigate(to)
    else onClick!()
  }

  const handleKeyDown = async (e: ButtonKeyboardEvent) => {
    const isEnterKey = e.key === 'Enter'

    if (isEnterKey) {
      await handleClick(e)
    }
  }

  return (
    <button
      className={classNames}
      type={submit ? 'submit' : 'button'}
      data-disabled={delayedLoading || disabled}
      data-centered={centered}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {delayedLoading ? 'Загрузка...' : children}
    </button>
  )
}

Button.defaultProps = {
  className: '',
  type: 'primary',
  size: 'lg',
  onClick: () => null,
  loading: false,
  disabled: false,
  submit: false,
  centered: false
}

export default memo(Button)
