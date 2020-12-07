import React, { memo, MouseEvent } from 'react'
import { navigate } from 'gatsby'
import { Loader } from '@elements'
import { handleEvent } from '@utils'
import './Button.scss'

type ButtonKeyboardEvent = React.KeyboardEvent<HTMLButtonElement>
type ButtonMouseEvent = MouseEvent<HTMLButtonElement>
type ButtonEvents = ButtonKeyboardEvent | ButtonMouseEvent

export interface ButtonProps {
  children: string
  className?: string
  type?: string
  size?: string
  onClick?(e: ButtonEvents): void
  disabled?: boolean
  loading?: boolean
  to?: string
  submit?: boolean
  centered?: boolean
}

const Button: React.FC<ButtonProps> = props => {
  const { className, type, size, to, children, onClick, loading, submit, centered } = props

  const classNames = `button button__${type}-${size} ${className}`
  const disabled = props.disabled || loading

  const handleClick = async (e: ButtonEvents) =>
    await handleEvent(
      async (e: ButtonEvents) => {
        e.stopPropagation()

        if (to) await navigate(to)
        else {
          onClick && onClick(e)
        }
      },
      { value: e, disabled }
    )

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
      data-disabled={loading || disabled}
      data-centered={centered}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {loading ? <Loader type={'Oval'} width={20} height={20} style={{ padding: '0.5rem' }} /> : children}
    </button>
  )
}

Button.defaultProps = {
  className: '',
  type: 'primary',
  size: 'lg',
  loading: false,
  disabled: false,
  submit: false,
  centered: false
}

export default memo(Button)
