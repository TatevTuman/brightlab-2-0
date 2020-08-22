import React from 'react'
import { Button, ButtonProps } from '@elements'

interface SignInButtonProps extends Omit<ButtonProps, 'children' | 'type'> {
  children?: string
}

const SignInButton: React.FC<SignInButtonProps> = props => {
  const { children, ...buttonProps } = props

  return (
    <Button type={'sign-in'} {...buttonProps}>
      {children || 'Sign In'}
    </Button>
  )
}

export default SignInButton
