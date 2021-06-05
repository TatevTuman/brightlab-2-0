const colors = require('./static/styles/colors')

const rem = 14
const array = max => new Array(max).fill(0).map((_, index) => index)

const pxToRem = px => px / rem + 'rem'

const spacing = array(200).reduce((acc, spacing) => ({ ...acc, [spacing]: pxToRem(spacing) }), {})
const borderRadius = array(30).reduce((acc, borderRadius) => ({ ...acc, [borderRadius]: pxToRem(borderRadius) }), {})
const fontSize = array(20).reduce((acc, fontSize) => ({ ...acc, [fontSize]: pxToRem(fontSize) }), {})
const lineHeight = array(40).reduce((acc, lineHeight) => ({ ...acc, [lineHeight]: pxToRem(lineHeight) }), {})

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    boxShadow: {
      DEFAULT: '1px, 2px, 4px, rgba(0, 0, 0, 1)'
    },
    colors: {
      ...colors
    },
    stroke: theme => ({
      current: 'currentColor',
      ...theme('colors')
    }),
    fill: theme => ({
      current: 'currentColor',
      ...theme('colors')
    }),
    fontFamily: {
      sans: ['Avenir', 'sans-serif']
    },
    fontSize: {
      ...fontSize,
      36: pxToRem(36),
      24: pxToRem(24)
    },
    lineHeight: {
      ...lineHeight
    },
    backgroundPosition: theme => theme('positions'),
    objectPosition: theme => theme('positions'),
    positions: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    screens: {
      /* If you change this, check Breakpoint types and useWindowSize */
      lg: { max: '1440px' },
      // => @media (max-width: 1440px) { ... }

      md: { max: '992px' },
      // => @media (max-width: 992px) { ... }

      sm: { max: '768px' },
      // => @media (max-width: 768px) { ... }

      xs: { max: '576px' }
      // => @media (max-width: 576px) { ... }
    },
    extend: {
      spacing: {
        ...spacing,
        200: pxToRem(200)
      },
      borderRadius: {
        ...borderRadius
      },
      backgroundImage: theme => ({
        /*checkbox: 'url("/assets/images/checkbox.svg")',*/
      }),
      gridTemplateColumns: {
        '7x32': 'repeat(7, 32px)'
      },
      flex: {
        0.75: 0.75,
        0.25: 0.25
      },
      maxWidth: {},
      minWidth: {
        320: pxToRem(320)
      },
      maxHeight: {
        0: 0,
        300: pxToRem(300),
        auto: 'auto'
      },
      minHeight: {
        '100vh': '100vh'
      },
      width: {
        '25%': '25%',
        '50%': '50%',
        '75%': '75%',
        '100%': '100%',
        fit: 'fit-content'
      },
      height: {
        '25%': '25%',
        '50%': '50%',
        '75%': '75%',
        '100%': '100%',
        200: pxToRem(200)
      },
      keyframes: {
        /*popover: {
          "0%": { transform: "scale(0)" },
          "80%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },*/
      },
      animation: {
        /*popover: "popover 1s ease",*/
      },
      zIndex: {
        0: 0,
        1: 1,
        2: 2
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      animation: ['motion-safe'],
      outline: ['hover', 'active'],
      fill: ['hover', 'active', 'focus'],
      stroke: ['hover', 'active', 'focus'],
      textColor: ['hover', 'active', 'focus', 'disabled'],
      borderColor: ['hover', 'active', 'focus', 'disabled', 'checked'],
      borderWidth: ['first'],
      margin: ['hover', 'active', 'focus', 'last'],
      backgroundColor: ['hover', 'active', 'focus', 'disabled', 'checked'],
      backgroundImage: ['hover', 'active', 'focus', 'disabled', 'checked'],
      pointerEvents: ['disabled']
    }
  },
  plugins: []
}
