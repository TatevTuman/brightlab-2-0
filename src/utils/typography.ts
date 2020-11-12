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
      },

      '.text-xl': { 'font-size': '1.66rem' }, // 30px mobile: 21.2px
      '.text-lg': { 'font-size': '1.33rem' }, // 24px mobile: 17.2px
      '.text-xm': { 'font-size': '1.11rem' }, // 20px mobile: 14.2px
      '.text-md': { 'font-size': '0.88rem' }, // 16px mobile: 11.2px
      '.text-sm': { 'font-size': '0.77rem' }, // 14px mobile: 9.8px
      '.text-xs': { 'font-size': '12px' }, // I don't think this font-size should be resized

      '.grey': { color: 'var(--secondary)' }, // #F4F4F4;
      '.blue': { color: 'var(--primary)' }, // #47DEFF;
      '.light-blue': { color: 'var(--primary-light)' }, // #46FFFF;
      '.dark-blue': { color: 'var(--primary-dark)' }, // #4B4E6D;
      '.black': { color: 'var(--black)' }, // #191919;
      '.white': { color: 'var(--white)' }, // #FFFFF;

      'p, a, h1, h2, h3, h4, h5, h6, li': {
        transition: 'all 0.2s ease'
      },

      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},

      a: {
        position: 'relative',
        display: 'inline-block',
        width: 'fit-content',
        color: 'var(--black)',
        textDecoration: 'none'
      },
      'a[data-active="true"]': {
        color: 'var(--primary)'
      },
      'a:hover': {
        cursor: 'pointer',
        color: 'var(--primary)'
      },
      'a[data-underlined="true"]:before': {
        content: 'close-quote',
        display: 'block',
        position: 'absolute',
        bottom: '-0.5rem',
        left: '0',
        width: '100%'
      },
      'a[data-active="true"]:before': {
        borderTop: '2px solid var(--primary)'
      },
      'a[data-underlined="true"]:hover:before': {
        borderTop: '2px solid var(--primary)'
      },

      ul: {
        listStyle: 'circle'
      },
      'ul[data-selection="true"] > li:hover': {
        cursor: 'pointer',
        color: 'var(--primary)'
      },

      ol: {
        listStyle: 'decimal-leading-zero'
      },
      'ol[data-selection="true"] > li:hover': {
        cursor: 'pointer',
        color: 'var(--primary)'
      },

      nav: {
        width: 'fit-content',
        marginLeft: '1.5rem',
        marginRight: 0,
        marginTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        margin: '0 -1rem'
      },
      'nav > li': {
        margin: '0 1rem'
      },
      'nav[data-direction="vertical"]': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '-1rem 0 1.5rem'
      },
      'nav[data-direction="vertical"] > li': {
        margin: '1rem 0rem'
      },
      label: {
        display: 'block',
        position: 'relative',
        width: 'fit-content',
        cursor: 'pointer'
      },
      'label[data-required="true"]::after': {
        content: '"*"',
        position: 'absolute',
        top: '0',
        right: '-7px',
        color: 'var(--danger)'
      },
      b: {},
      em: {
        color: 'var(--secondary-dark)'
      },
      i: {},
      small: {},
      strong: {
        color: 'var(--primary)'
      },
      sub: {},
      sup: {},
      ins: {},
      del: {},
      mark: {
        color: 'var(--white)',
        backgroundColor: 'black',
        display: 'inline-block',
        padding: '0 1rem'
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
