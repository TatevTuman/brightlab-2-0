import { ApolloClient } from '@apollo/client'

export type Client = ApolloClient<Record<string, any>>

export type ResponseType<T> = {
  res: T
}

export type PaginationType = {
  itemCount: number
  total: number
  pageSize: number
  totalPages: number
  current: number
}

export type PaginationArgs = {
  page: number
  pageSize: number
}

export type PaginationResponse<T> = {
  entries: T[]
  pageNumber: number
  pageSize: number
  totalEntries: number
  totalPages: number
}

export type QueryPaginationArgs = {
  pagination?: PaginationArgs
}

export type QueryPaginationResponse<T> = {
  content: T[]
  pagination: PaginationType
}

export type ErrorMessage = {
  code: string
  field?: string
  message?: string
  options: {
    key: string
    value: string
  }[]
  template?: string
}

export type MutationResponse<TRes> = {
  result: TRes
  messages?: ErrorMessage[]
  successful: boolean
}

export type User = {
  businessName?: string
  country?: string
  description?: string
  email: string
  id: string
  insertedAt: string
  name?: string
  phone?: string
  surname?: string
  updatedAt: string
}

export enum MenuDeliveryStatusEnumType {
  Both = 'BOTH',
  Collection = 'COLLECTION',
  Delivery = 'DELIVERY'
}

export enum MenuDeliveryManEnumType {
  Both = 'BOTH',
  Cook = 'COOK',
  Hero = 'HERO'
}

export enum CourseReheatingEnumType {
  Hob = 'HOB',
  Microwave = 'MICRO',
  Oven = 'OVEN'
}

export enum CoursePackagingEnumType {
  Bioegradable = 'BIODEGRADABLE',
  Home_Cooks = 'HOME_COOKS',
  Microwavable = 'MICROWAVABLE',
  Oven_Proof = 'OVEN_PROOF',
  Recyclable = 'RECYCLABLE'
}

export enum OrderStatusEnumType {
  Created = 'CREATED',
  Paid = 'PAID'
}

export type MenuDealType = {
  id: string
  title: string
  note: string
  tags: string[]
  includes: string
  discountPercent: number
  discountPrice: number
}

export type MenuSectionCourseReheatingType = {
  instruction: string
  temp: number
  time: string
  type: CourseReheatingEnumType | null
}

export type MenuSectionCourseOptionType = {
  option: string
  price: number
}

export type MenuSectionCourseDealType = {
  price: number
  quantity: number
}

export type MenuSectionCourseType = {
  id: string
  title: string
  description: string
  tags: string[]
  allergens: string[]
  serving: number
  price: number
  deal: MenuSectionCourseDealType
  options: MenuSectionCourseOptionType[]
  packaging: CoursePackagingEnumType
  reheatings: MenuSectionCourseReheatingType[]
  sectionId?: string
  insertedAt?: string
  updatedAt?: string
}

export type MenuSectionType = {
  id: string
  menuId?: string
  title: string
  courses: MenuSectionCourseType[]
  insertedAt?: string
  updatedAt?: string
}

export type MenuCreateType = {
  title: string
  cookTime: string
  collectionTime: string
  delivery: MenuDeliveryStatusEnumType
  deliveryCommunities: string[]
  deliveryFinishTime: string
  deliveryMan: MenuDeliveryManEnumType
  deliveryTime: string
  deals: MenuDealType[]
  sections: {
    courses: MenuSectionCourseType[]
    menuId?: string
    title: string
  }[]
  images: any[] // TODO
  maxOrders: number
  personalIntro: string
  postDate: string
  insertedAt?: string
  updatedAt?: string
}

export type MenuImageType = {
  id: string
  name: string
  path: string
  insertedAt: string
  updatedAt: string
}

export type MenuType = {
  id: string
  title: string
  cookTime: string
  collectionTime: string
  delivery: MenuDeliveryStatusEnumType
  deliveryCommunities: string[]
  deliveryFinishTime: string
  deliveryMan: MenuDeliveryManEnumType
  deliveryTime: string
  deals: MenuDealType[]
  sections: MenuSectionType[]
  images: any[]
  maxOrders: number
  personalIntro: string
  postDate: string
  insertedAt?: string
  updatedAt?: string
}

export type OrderCourseType = {
  count: number
  course: MenuSectionCourseType
  options: MenuSectionCourseOptionType[]
  order: OrderType
}

export type OrderType = {
  courses: MenuSectionCourseType[]
  id: string
  insertedAt: string
  ordersCourses: OrderCourseType[]
  sessionId: string
  status: OrderStatusEnumType
  totalPrice: number
  updatedAt: string
  user: User
}

export type OrderCreateType = {
  count: number
  courseId: string
  options?: (MenuSectionCourseOptionType & { count: number })[]
}[]

export type AddressType = {
  addressLine: string
  apartment: number
  entance: number
  floor: number
  id: string
  insertedAt: string
  intercom: number
  phone: string
  updatedAt: string
}

export type AddressCreateType = {
  addressLine: string
  apartment: number
  entance: number
  floor: number
  intercom: number
  phone: string
}
