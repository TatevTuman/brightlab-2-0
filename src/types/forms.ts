import { Deal, MenuDeliveryStatus } from './apollo'

export type SignInFormType = {
  email: string
  password: string
}

export type SignUpFormType = {
  email: string
  password: string
}

export type CreateMenuFormType = {
  collectionTime: string
  cookTime: string
  deals: Omit<Deal, 'id'>[]
  delivery: MenuDeliveryStatus
  deliveryCommunities: string[]
  deliveryFinishTime: string
  deliveryMan: MenuDeliveryStatus
  deliveryTime: string
  maxOrders: number
  personalIntro: string
  postDate: Date
  title: string
}
