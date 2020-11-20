import Typography from 'typography'

// all styles that are
// included in import './src/assets/styles/app.scss' are allowed to use here

const typography = new Typography({
  title: 'Brightlab',
  baseFontSize: '16px', // font-size
  baseLineHeight: 1.5, // line-height
  scaleRatio: 5, // default headings sizes <h1 style={{ fontSize: calc(16px * 5) || 5rem }}>Heading</h1>
  headerFontFamily: ['Helvetica Neue', 'sans-serif'],
  bodyFontFamily: ['Helvetica Neue', 'sans-serif'],
  headerColor: `inherit`,
  bodyColor: `inherit`,
  headerGray: 20,
  headerGrayHue: 0,
  bodyGray: 20,
  bodyGrayHue: 0,
  headerWeight: 'bold',
  bodyWeight: 'normal',
  boldWeight: 'bold',
  blockMarginBottom: 1.5, // 1 rhythm unit = baseLineHeight = 1rem
  includeNormalize: true,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => {
    // All typography styles should be here, if they are global
    const { bodyFontFamily, baseLineHeight } = options

    return {
      '@media(max-width: 1280px)': {
        html: {
          font: `100%/${baseLineHeight} ${bodyFontFamily}`
        }
      },
      '@media(max-width: 720px)': {
        html: {
          font: `80%/${baseLineHeight} ${bodyFontFamily}`
        }
      },
      '@media(max-width: 414px)': {
        html: {
          font: `60%/${baseLineHeight} ${bodyFontFamily}`
        }
      }
    }
  }
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
// Functions to calculate sizes returns rems
export const rhythm = typography.rhythm
export const scale = typography.scale
