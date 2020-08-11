import { DocumentNode } from '@apollo/client'

export type GraphQlLocation = {
  line: number
  column: number
}

export type GraphQLErrorSource = {
  body: string
  name: string
  locationOffset: GraphQlLocation
}

export type GraphQLError = {
  message: string
  locations?: GraphQlLocation[]
  path?: (string | number)[]
  nodes?: DocumentNode[]
  source?: GraphQLErrorSource
  positions?: number[]
  originalError?: Error
  extensions?: { [key: string]: any }
}
