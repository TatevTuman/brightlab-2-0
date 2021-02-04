import { get } from 'lodash'
import { OptionType, OptionSchema } from '@types'

interface handleEventOptions {
  value?: any
  disabled?: boolean
}

export const handleEvent = (handler?: (...args: any) => void, options: handleEventOptions = {}) => {
  const { disabled, value } = options

  if (disabled) return

  return handler && handler(value)
}

export const getOptionsBySchema = <T = Record<string, any>, V = OptionType<string>>(
  arr: T[],
  optionSchema: OptionSchema
) => {
  return arr.map(item => {
    return Object.keys(optionSchema).reduce((acc, field) => {
      const itemKey = get(optionSchema, field)
      const optionKey = field

      if (typeof itemKey === 'function') {
        return {
          ...acc,
          [optionKey]: itemKey(item)
        }
      } else {
        return {
          ...acc,
          [optionKey]: (item || ({} as Record<string, any>))[itemKey]
        }
      }
    }, {} as V)
  })
}

// TODO tests
/*
  Groups array by first letter, for example:

  const arr = [{ hello: 'Abc' }, { hello: 'Bcd' }]
  groupByFirstChar(arr, 'hello')

  return {
    'A': [{ hello: 'Abc' }],
    'B': [{ hello: 'Bcd' }]
  }
*/
