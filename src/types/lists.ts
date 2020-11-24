export type OptionType<T> = {
  value: T
  label: string
}

export type NavigationItemType = {
  path: string
  label: string
}

export type NavigationType = NavigationItemType[]
