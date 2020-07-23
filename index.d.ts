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
