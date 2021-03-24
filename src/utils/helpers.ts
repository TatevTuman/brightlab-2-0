import { get } from 'lodash'
import { OptionType } from '@types'

interface handleEventOptions {
  value?: any
  disabled?: boolean
}

export const handleEvent = (handler?: (...args: any) => void, options: handleEventOptions = {}) => {
  const { disabled, value } = options

  if (disabled) return

  return handler && handler(value)
}

/*
  Converts array of objects to options
  Example:
   getOptionsBySchema<{ id: number, title: string }, number>(
    [{ id: 1, title: 'Test' }],
    'title',
    'id'
  )

  Result: [{ label: 'Test', value: 1 }]
*/
export const objectsToOptions = <T, V = string>(
  arr: T[],
  labelKey: keyof T | ((item: T) => string),
  valueKey: keyof T | ((item: T) => V)
): OptionType<V>[] => {
  return arr.map(item => {
    return {
      label: typeof labelKey === 'function' ? labelKey(item) : get(item, labelKey),
      value: typeof valueKey === 'function' ? valueKey(item) : get(item, valueKey)
    } as OptionType<V>
  })
}
