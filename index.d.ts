// type Writeable<T> = { -readonly [P in keyof T]: T[P] }
//
// declare namespace NodeJS {
//   interface Global extends Writeable<{ innerWidth: number }> {}
// }

type TypographyOptions = Partial<{
  title: string
  baseFontSize: string
  baseLineHeight: number
  scaleRatio: number
  googleFonts: {
    name: string
    styles: string[]
  }[]
  headerColor: string
  bodyColor: string
  headerFontFamily: string[]
  bodyFontFamily: string[]
  headerGray: number
  headerGrayHue: number
  bodyGray: number
  bodyGrayHue: number
  headerWeight: string
  bodyWeight: string
  boldWeight: string
  blockMarginBottom: number
  includeNormalize: boolean
  overrideStyles(...args: any): Record<string, Record<string, any>>
}>

declare module 'typography' {
  export default class Typography {
    constructor(options?: TypographyOptions)

    toString(): string
    injectStyles(): void
    rhythm(value: number): string
    scale(value: number): void
    options: TypographyOptions
  }
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

// declare module '*.svg' {
//   const src: string
//   export default src
// }

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.gql' {
  import { DocumentNode } from '@apollo/client'

  const value: DocumentNode
  export default value
}

declare module '*.json' {
  const value: any;
  export default value;
}
