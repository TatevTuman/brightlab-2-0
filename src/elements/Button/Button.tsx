import React, { memo, MouseEvent } from 'react'
import { navigate } from 'gatsby'
import { useLoadingDelay } from '@hooks'
import './Button.scss'

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
  const {
    className = '',
    type = 'primary',
    size = 'lg',
    to,
    children,
    onClick = () => null,
    loading = false,
    disabled = false,
    submit = false,
    centered = false
  } = props

  const classNames = `button button__${type}-${size} ${className}`
  const delayedLoading = useLoadingDelay(loading)

  const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (to) await navigate(to)
    else onClick()
  }

  return (
    <button
      className={classNames}
      type={submit ? 'submit' : 'button'}
      data-disabled={delayedLoading || disabled}
      data-centered={centered}
      onClick={handleButtonClick}
    >
      {delayedLoading ? 'Загрузка...' : children}
    </button>
  )
}

export default memo(Button)
