const colors = require('./static/assets/styles/colors')

const rem = 14
const array = max => new Array(max).fill(0).map((_, index) => index)

const pxToRem = px => px / rem + 'rem'

const spacing = array(200).reduce((acc, spacing) => ({ ...acc, [spacing]: pxToRem(spacing) }), {})
const borderRadius = array(30).reduce((acc, borderRadius) => ({ ...acc, [borderRadius]: pxToRem(borderRadius) }), {})
const fontSize = array(70).reduce((acc, fontSize) => ({ ...acc, [fontSize]: pxToRem(fontSize) }), {})
const lineHeight = array(40).reduce((acc, lineHeight) => ({ ...acc, [lineHeight]: pxToRem(lineHeight) }), {})

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class' dark:hover:text-xl
  theme: {
    boxShadow: {
      sm: '0px 3px 12px rgba(215, 215, 218, 0.5)',
      DEFAULT: '1px, 2px, 4px, rgba(62, 66, 223, 0.35)',
      md: '0 0 0 3px rgba(62, 66, 223, 0.35)',
      lg: '0 0 0 5px rgba(62, 66, 223, 0.35)',
      xl: '7px 19px 55px rgba(217, 220, 228, 0.25)',
      card: '0px 57px 45px rgba(217, 220, 228, 0.34)',
      alert: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      green: colors.green,
      orange: colors.orange,
      red: colors.red,
      yellow: colors.yellow
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
      sans: [/*'Your font family'*/ 'sans-serif'] // text-sans
    },
    fontSize: {
      ...fontSize
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
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' }
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      spacing: {
        ...spacing,
        380: pxToRem(380),
        700: pxToRem(700),
        225: pxToRem(225),
        266: pxToRem(266),
        300: pxToRem(300),
        445: pxToRem(445),
        677: pxToRem(677)
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
      maxWidth: {
        170: pxToRem(170),
        280: pxToRem(280),
        470: pxToRem(470),
        780: pxToRem(780),
        816: pxToRem(816),
        645: pxToRem(645),
        384: pxToRem(384)
      },
      minWidth: {
        38: pxToRem(38),
        170: pxToRem(170),
        200: pxToRem(200),
        816: pxToRem(816)
      },
      width: {
        248: pxToRem(248),
        '25%': '25%',
        '50%': '50%',
        '75%': '75%',
        '100%': '100%',
        '100%/7': 'calc(100% / 7)',
        fit: 'fit-content'
      },
      height: {
        '25%': '25%',
        '50%': '50%',
        '75%': '75%',
        '100%': '100%'
      },
      minHeight: {
        40: pxToRem(40)
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
      margin: ['hover', 'active', 'focus', 'last'],
      backgroundColor: ['hover', 'active', 'focus', 'disabled', 'checked'],
      backgroundImage: ['hover', 'active', 'focus', 'disabled', 'checked'],
      pointerEvents: ['disabled']
    }
  },
  plugins: []
}
