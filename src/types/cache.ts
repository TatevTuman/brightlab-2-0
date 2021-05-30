import { MenuType, MenuSectionType, MenuSectionCourseType, MenuSectionCourseOptionType } from './apollo'

export type CacheBasketMenuSectionCourseOptionType = {
  quantity: number
} & MenuSectionCourseOptionType

export type CacheBasketMenuSectionCourseType = {
  quantity: number
  note: string
  options: CacheBasketMenuSectionCourseOptionType[]
} & MenuSectionCourseType

export type CacheBasketMenuSectionType = {
  courses: CacheBasketMenuSectionCourseType[]
} & MenuSectionType

export type CacheBasketMenuType = {
  sections: CacheBasketMenuSectionType[]
} & MenuType

export type CacheBasketType = {
  menus: CacheBasketMenuType[]
}
