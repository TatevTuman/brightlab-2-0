interface handleEventOptions {
  value?: any
  disabled?: boolean
}

export const handleEvent = (handler?: (...args: any) => void, options: handleEventOptions = {}) => {
  const { disabled, value } = options

  if (disabled !== undefined) {
    return !disabled && handler && handler(value)
  }

  return handler && handler(value)
}
