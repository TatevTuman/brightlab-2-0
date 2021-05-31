import { get } from "lodash"
import { OptionType } from "~types"

interface handleEventOptions {
  value?: any
  disabled?: boolean
}

export const handleEvent = (
  handler?: (...args: any) => void,
  options: handleEventOptions = {}
) => {
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
export const arrayToOptions = <T, V = string>(
  arr: T[],
  labelKey: keyof T | ((item: T) => string),
  valueKey: keyof T | ((item: T) => V)
): OptionType<V>[] => {
  return arr.map(item => {
    return {
      label:
        typeof labelKey === "function" ? labelKey(item) : get(item, labelKey),
      value:
        typeof valueKey === "function" ? valueKey(item) : get(item, valueKey),
    } as OptionType<V>
  })
}

/* TODO tests and description */
export const enumToOptions = (enumType: any): OptionType[] => {
  const keys = Object.keys(enumType)
  const values: string[] = Object.values(enumType)

  const options = []

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = values[i]

    options.push({
      label: key,
      value: value,
    })
  }

  return options
}

/* TODO tests and description */
export const fileSize = (bytes: number) => {
  let fsize
  const fsizekb = bytes / 1024
  const fsizemb = fsizekb / 1024
  const fsizegb = fsizemb / 1024

  if (fsizekb <= 1024) {
    fsize = fsizekb.toFixed(1) + "kb"
  } else if (fsizekb >= 1024 && fsizemb <= 1024) {
    fsize = fsizemb.toFixed(1) + "Mb"
  } else if (fsizemb >= 1024 && fsizegb <= 1024) {
    fsize = fsizegb.toFixed(1) + "Gb"
  }

  return fsize
}

/* TODO tests and description */
export const removeFieldRecursively = <T>(obj: T, field: string) => {
  for (const prop in obj) {
    if (prop === field) delete obj[prop]
    else if (typeof obj[prop] === "object")
      removeFieldRecursively(obj[prop], field)
  }

  return obj
}

type FormDataPrimitive = string | Blob | number | boolean

interface FormDataNest {
  [x: string]: FormVal
}

type FormVal = FormDataNest | FormDataPrimitive

/* TODO tests and description */
export const buildFormData = (
  formData: FormData,
  data: FormVal,
  parentKey?: string
) => {
  if (Array.isArray(data)) {
    data.forEach(el => {
      buildFormData(formData, el, parentKey)
    })
  } else if (typeof data === "object" && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(
        formData,
        (data as any)[key],
        parentKey ? `${parentKey}.${key}` : key
      )
    })
  } else {
    if (!data) {
      return
    }

    const value =
      typeof data === "boolean" || typeof data === "number"
        ? data.toString()
        : data
    formData.append(parentKey as string, value)
  }
}

/* TODO tests and description */
export const getFormData = (data: Record<string, FormDataNest>) => {
  const formData = new FormData()

  buildFormData(formData, data)

  return formData
}
