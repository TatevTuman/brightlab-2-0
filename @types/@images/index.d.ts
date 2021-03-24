declare module '@images/*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '@images/*.jpg' {
  export const src: string
  export default src
}

declare module '@images/*.png' {
  export const src: string
  export default src
}

// declare module '*.svg' {
//   import * as React from 'react'
//   export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
//   export default ReactComponent
// }
