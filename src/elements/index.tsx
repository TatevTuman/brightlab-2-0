import loadable from '@loadable/component'
import { withLoadableFallback } from '@hocs'

// export { default as Button } from './Button/Button'
// export { default as Image } from './Image/Image'
// export { default as Link } from './Link/Link'
// export { default as Input } from './Input/Input'
// export { default as Checkbox } from './Checkbox/Checkbox'
// export { default as Navigation } from './Navigation/Navigation'
// export { default as Dropdown } from './Dropdown/Dropdown'
// export { default as Alert } from './Alert/Alert'
// export { default as Loader } from './Loader/Loader'
// export { default as Pagination } from './Pagination/Pagination'
// export { default as ValidationErrorMessage } from './ValidationErrorMessage/ValidationErrorMessage'
// export { default as Fallback } from './Fallback/Fallback'

export type { ButtonProps, ButtonEvents } from './Button/Button'
export type { ImageProps } from './Image/Image'
export type { LinkProps } from './Link/Link'
export type { InputProps, InputSuffixProp } from './Input/Input'
export type { CheckboxProps } from './Checkbox/Checkbox'
export type { NavigationProps } from './Navigation/Navigation'
export type { DropdownProps } from './Dropdown/Dropdown'
export type { AlertProps } from './Alert/Alert'
export type { LoaderProps } from './Loader/Loader'
export type { PaginationProps } from './Pagination/Pagination'
export type { ValidationErrorMessageProps } from './ValidationErrorMessage/ValidationErrorMessage'
export type { FallbackProps } from './Fallback/Fallback'

export const Button = loadable(() => import('./Button/Button'))
export const Image = loadable(() => import('./Image/Image'))
export const Link = loadable(() => import('./Link/Link'))
export const Input = loadable(() => import('./Input/Input'))
export const Checkbox = loadable(() => import('./Checkbox/Checkbox'))
export const Navigation = loadable(() => import('./Navigation/Navigation'))
export const Dropdown = loadable(() => import('./Dropdown/Dropdown'))
export const Alert = loadable(() => import('./Alert/Alert'))
export const Loader = loadable(() => import('./Loader/Loader'))
export const Pagination = loadable(() => import('./Pagination/Pagination'))
export const ValidationErrorMessage = loadable(() => import('./ValidationErrorMessage/ValidationErrorMessage'))
export const Fallback = loadable(() => import('./Fallback/Fallback'))

// const Button = withLoadableFallback<ButtonProps>(import('./Button/Button'), {
//   fallback: { height: '10rem' }
// })
// const Image = withLoadableFallback<ImageProps>(import('./Image/Image'), {
//   fallback: { height: '10rem' }
// })
// const Link = withLoadableFallback<LinkProps>(import('./Link/Link'), {
//   fallback: { height: '10rem' }
// })
// const Input = withLoadableFallback<InputProps>(import('./Input/Input'), {
//   fallback: { height: '10rem' }
// })
// const Checkbox = withLoadableFallback<CheckboxProps>(import('./Checkbox/Checkbox'), {
//   fallback: { height: '10rem' }
// })
// const Navigation = withLoadableFallback<NavigationProps>(import('./Navigation/Navigation'), {
//   fallback: { height: '10rem' }
// })
// const Dropdown = withLoadableFallback<DropdownProps>(import('./Dropdown/Dropdown'), {
//   fallback: { height: '10rem' }
// })
// const Alert = withLoadableFallback<AlertProps>(import('./Alert/Alert'), {
//   fallback: { height: '10rem' }
// })
// const Loader = withLoadableFallback<LoaderProps>(import('./Loader/Loader'), {
//   fallback: { height: '10rem' }
// })
// const Pagination = withLoadableFallback<PaginationProps>(import('./Pagination/Pagination'), {
//   fallback: { height: '10rem' }
// })
// const ValidationErrorMessage = withLoadableFallback<ValidationErrorMessageProps>(
//   import('./ValidationErrorMessage/ValidationErrorMessage'),
//   {
//     fallback: { height: '10rem' }
//   }
// )
// const Fallback = withLoadableFallback<FallbackProps>(import('./Fallback/Fallback'), {
//   fallback: { height: '10rem' }
// })

// export {
//   Button,
//   Image,
//   Link,
//   Input,
//   Checkbox,
//   Navigation,
//   Dropdown,
//   Alert,
//   Loader,
//   Pagination,
//   ValidationErrorMessage,
//   Fallback
// }

// export type {
//   ButtonProps,
//   ButtonEvents,
//   ImageProps,
//   LinkProps,
//   InputProps,
//   InputSuffixProp,
//   CheckboxProps,
//   NavigationProps,
//   DropdownProps,
//   AlertProps,
//   LoaderProps,
//   PaginationProps,
//   ValidationErrorMessageProps,
//   FallbackProps
// }
