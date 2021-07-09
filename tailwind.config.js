const colors = require('./static/styles/colors')

const rem = 16
const array = max => new Array(max).fill(0).map((_, index) => index)

const pxToRem = px => px / rem + 'rem'

const spacing = array(300).reduce((acc, spacing) => ({ ...acc, [spacing]: pxToRem(spacing) }), {})
const borderRadius = array(30).reduce((acc, borderRadius) => ({ ...acc, [borderRadius]: pxToRem(borderRadius) }), {})
const fontSize = array(25).reduce((acc, fontSize) => ({ ...acc, [fontSize]: pxToRem(fontSize) }), {})
const lineHeight = array(40).reduce((acc, lineHeight) => ({ ...acc, [lineHeight]: pxToRem(lineHeight) }), {})

const defaultValues = {
  '25%': '25%',
  '30%': '30%',
  '33%': '33.333%',
  '50%': '50%',
  '66%': '66.666%',
  '75%': '75%',
  '100%': '100%',
  inherit: 'inherit',
  auto: 'auto',
  fit: 'fit-content'
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    boxShadow: {
      DEFAULT: `${pxToRem(1)}, ${pxToRem(2)}, ${pxToRem(4)}, rgba(0, 0, 0, 0.5)`
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
      sans: ['Lab Grotesque', 'sans-serif']
    },
    fontSize: {
      ...fontSize,
      36: pxToRem(36),
      '26': pxToRem(26)
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
        ...defaultValues,
        '100%': '100%'
      },
      borderRadius: {
        ...borderRadius,
        '25%': '25%',
        '50%': '50%'
      },
      backgroundImage: theme => ({
        'sign-in-page-layout': 'url("/images/sign-in-page-layout.png")',
        'sign-up-page-layout': 'url("/images/sign-up-page-layout.png")'
      }),
      gridTemplateColumns: {
        '7x32': 'repeat(7, 32px)'
      },
      flex: {
        0.75: 0.75,
        0.25: 0.25
      },
      maxWidth: {
        ...spacing,
        ...defaultValues,
        screen: '100vw'
      },
      minWidth: {
        ...spacing,
        ...defaultValues,
        320: pxToRem(320),
        screen: '100vw'
      },
      maxHeight: {
        ...spacing,
        ...defaultValues,
        screen: '100vh'
      },
      minHeight: {
        ...spacing,
        ...defaultValues,
        screen: '100vh'
      },
      width: {
        ...defaultValues,
        screen: '100vw'
      },
      height: {
        ...defaultValues,
        screen: '100vh'
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
      opacity: ['hover', 'group-hover', 'disabled', 'focus', 'focus-within'],
      animation: ['motion-safe'],
      outline: ['hover', 'active'],
      fill: ['hover', 'group-hover', 'active', 'focus'],
      stroke: ['hover', 'group-hover', 'active', 'focus'],
      ringColor: ['hover', 'active', 'focus', 'focus-within', 'disabled'],
      ringWidth: ['hover', 'active', 'focus', 'focus-within', 'disabled'],
      ringOffsetWidth: ['hover', 'active', 'focus', 'focus-within', 'disabled'],
      textColor: ['hover', 'group-hover', 'active', 'focus', 'disabled'],
      borderColor: ['hover', 'group-hover', 'active', 'focus', 'disabled', 'checked'],
      borderWidth: ['first', 'group-hover', 'hover', 'active', 'focus', 'focus-within', 'disabled', 'checked'],
      borderStyle: ['hover'],
      margin: ['hover', 'active', 'focus', 'last'],
      backgroundColor: ['hover', 'active', 'focus', 'disabled', 'checked'],
      backgroundImage: ['hover', 'active', 'focus', 'disabled', 'checked'],
      translate: ['hover'],
      pointerEvents: ['disabled']
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
