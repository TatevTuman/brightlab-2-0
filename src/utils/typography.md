# Typography
[Typograpgy playgorund and api](https://kyleamathews.github.io/typography.js/)

#### When creating a new instance of Typography, you can pass in an configuration object. All configuration keys are optional.
#
- **title**: The theme title.
- **baseFontSize**: The base font size in pixels, defaults to 16px.

- **baseLineHeight**: The base line height using the css unitless number, defaults to 1.5.

- **scaleRatio**: The “scale ratio” for the theme. This value is the ratio between the h1 font size and the baseFontSize. So if the scale ratio is 2 and the baseFontSize is 16px then the h1 font size is 32px.

- **googleFonts**: An array specifying Google Fonts for this project.
```javascript
googleFonts: [
  {
    name: 'Montserrat',
    styles: [
      '700',
    ],
  },
  {
    name: 'Merriweather',
    styles: [
      '400',
      '400i',
      '700',
      '700i',
    ],
  },
]
```
- **headerFontFamily**: An array of strings specifying the font family stack for headers e.g. ['Helvetica', 'sans-serif']. Defaults to a system UI font stack.

- **bodyFontFamily**: An array of strings specifying the font family stack for the body, defaults to ['georgia', 'serif'].

- **headerGray**: The “lightness” value for headers (set in hsl). Defaults to 20.

- **headerGrayHue**: The “hue” value for headers (set in hsl). Defaults to 0. Also accepts three named hues, cool, slate, and warm.

- **bodyGray**: The “lightness” value for body text (in hsl). Defaults to 20.

- **bodyGrayHue**: The “hue” value for body text (in hsl). Defaults to 0. Also accepts three named hues, cool, slate, and warm.

- **headerWeight**: Specify the font weight for headers. Defaults to bold.

- **bodyWeight**: Specify the font weight for body text. Defaults to normal.

- **boldWeight**: Specify the font weight for “bold” (b, strong, dt, th) elements. Defaults to bold.

- **blockMarginBottom**: Specify the default margin-bottom for block elements. Defaults to one “rhythm unit” (i.e. the height of the base line height).

- **includeNormalize**: Include normalize.css. Normalize.css is an excellent project which works to normalize the base browser CSS across browsers and serves as an excellent foundation for Typography.js. We include normalize.CSS by default but if you’re already including it elsewhere in your project, you can disable including it here by passing false.

- **overrideStyles**: Imperative API for directly adding to or overriding auto-generated styles. It’s called with a Vertical Rhythm object, the options object, and the algorithmically generated styles.
```javascript
overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
  h1: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  blockquote: {
    ...adjustFontSizeTo('19px'),
    color: gray(41),
    fontStyle: 'italic',
    paddingLeft: rhythm(13/16),
    marginLeft: rhythm(-1),
    borderLeft: `${rhythm(3/16)} solid ${gray(10)}`,
  },
  'blockquote > :last-child': {
    marginBottom: 0,
  },
})
```

- overrideThemeStyles: This has the same function signature as overrideStyles but should be used in place of overrideStyles when using a 3rd-party theme so as to not delete the theme’s own overrideStyles function.
```javascript
overrideThemeStyles: ({ rhythm }, options, styles) => ({
  'h2,h3': {
    marginBottom: rhythm(1/2),
    marginTop: rhythm(2),
  }
})
```
