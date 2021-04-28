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

/* TODO tests and description */
export const fileSize = (bytes: number) => {
  let fsize
  const fsizekb = bytes / 1024
  const fsizemb = fsizekb / 1024
  const fsizegb = fsizemb / 1024

  if (fsizekb <= 1024) {
    fsize = fsizekb.toFixed(1) + 'kb'
  } else if (fsizekb >= 1024 && fsizemb <= 1024) {
    fsize = fsizemb.toFixed(1) + 'Mb'
  } else if (fsizemb >= 1024 && fsizegb <= 1024) {
    fsize = fsizegb.toFixed(1) + 'Gb'
  }

  return fsize
}
