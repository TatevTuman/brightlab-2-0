export type OptionType<T = string> = {
  value: T
  label: string
}

export type NavigationItemType = {
  path: string
  label: string
  icon?: string
}

export type NavigationType = NavigationItemType[]
