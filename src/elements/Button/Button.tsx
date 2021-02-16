import React, { memo, MouseEvent } from 'react'
import { navigate } from 'gatsby'
import { Loader } from '@elements'
import { handleEvent } from '@utils'
import './Button.scss'

type ButtonKeyboardEvent = React.KeyboardEvent<HTMLButtonElement>
type ButtonMouseEvent = MouseEvent<HTMLButtonElement>

export type ButtonEvents = ButtonKeyboardEvent | ButtonMouseEvent
export enum ButtonSizes {
  lg = 'lg',
  md = 'md',
  sm = 'sm'
}
export enum ButtonTypes {
  primary = 'primary',
  secondary = 'secondary',
  danger = 'danger'
}

export interface ButtonProps {
  children: string
  className?: string
  type?: ButtonTypes
  size?: ButtonSizes
  onClick?(e: ButtonEvents): void
  disabled?: boolean
  loading?: boolean
  to?: string
  submit?: boolean
  centered?: boolean
  form?: string
}

const Button: React.FC<ButtonProps> = props => {
  const { className, type, size, to, children, onClick, loading, submit, centered, form } = props

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
      form={form}
      tabIndex={0}
    >
      {loading ? <Loader type={'Oval'} width={20} height={20} style={{ padding: '0.5rem' }} /> : children}
    </button>
  )
}

Button.defaultProps = {
  className: '',
  type: ButtonTypes.primary,
  size: ButtonSizes.lg,
  loading: false,
  disabled: false,
  submit: false,
  centered: false
}

export default memo(Button)
