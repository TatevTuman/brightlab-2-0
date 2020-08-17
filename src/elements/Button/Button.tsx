import React, { MouseEvent } from 'react'
import { navigate } from 'gatsby'
import { useLoadingDelay } from '@hooks'
import './Button.scss'

interface ButtonProps {
  type?: string
  size?: string
  onClick?(): void
  children: string
  disabled?: boolean
  loading?: boolean
  to?: string
}

const Button: React.FC<ButtonProps> = props => {
  const { type = 'primary', size = 'lg', to, children, onClick = () => null, loading = false, disabled = false } = props

  const className = `button button__${type}-${size}`
  const delayedLoading = useLoadingDelay(loading)

  const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (to) await navigate(to)
    else onClick()
  }

  return (
    <button className={className} data-disabled={delayedLoading || disabled} onClick={handleButtonClick}>
      {delayedLoading ? 'Загрузка...' : children}
    </button>
  )
}

export default Button
