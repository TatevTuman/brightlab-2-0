import { get } from 'lodash'
import { OptionType, OptionSchema, AnyObject } from '@types'

interface handleEventOptions {
  value?: any
  disabled?: boolean
}

export const handleEvent = (handler?: (...args: any) => void, options: handleEventOptions = {}) => {
  const { disabled, value } = options

  if (disabled) return

  return handler && handler(value)
}

// TODO refactor
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
type EnumSignature = string | number

export const enumToArray = (Enum: AnyObject): EnumSignature[] => {
  // const StringIsNumber = (value: EnumSignature) => !isNaN(Number(value))
  return Object.keys(Enum).map(key => Enum[key])
}
