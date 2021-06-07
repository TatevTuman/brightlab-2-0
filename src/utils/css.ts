export default {
  /* TODO tests and description */
  getRandomColor: () => {
    const letters = '0123456789ABCDEF'
    let color = '#'

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }

    return color
  },

  /* TODO tests and description */
  pxToRem: (px: number, baseFontSize?: number) => {
    baseFontSize = baseFontSize || 16

    const remSize = px / baseFontSize
    return remSize + 'rem'
  },

  /* TODO tests and description */
  pxToVW: (px: number, baseWidth?: number) => {
    baseWidth = baseWidth || 1440

    return `calc(${px} * 100vw / ${baseWidth})`
  }
}
