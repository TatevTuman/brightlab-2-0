import { withLoadableFallback } from '@hocs'

import type { ButtonProps, ButtonEvents } from './Button/Button'
import type { ImageProps } from './Image/Image'
import type { LinkProps } from './Link/Link'
import type { InputProps, InputSuffixProp } from './Input/Input'
import type { CheckboxProps } from './Checkbox/Checkbox'
import type { NavigationProps } from './Navigation/Navigation'
import type { DropdownProps } from './Dropdown/Dropdown'
import type { AlertProps } from './Alert/Alert'
import type { LoaderProps } from './Loader/Loader'
import type { PaginationProps } from './Pagination/Pagination'
import type { ValidationErrorMessageProps } from './ValidationErrorMessage/ValidationErrorMessage'
import type { FallbackProps } from './Fallback/Fallback'

const Button = withLoadableFallback<ButtonProps>(import('./Button/Button'), {
  fallback: { height: '10rem' }
})
const Image = withLoadableFallback<ImageProps>(import('./Image/Image'), {
  fallback: { height: '10rem' }
})
const Link = withLoadableFallback<LinkProps>(import('./Link/Link'), {
  fallback: { height: '10rem' }
})
const Input = withLoadableFallback<InputProps>(import('./Input/Input'), {
  fallback: { height: '10rem' }
})
const Checkbox = withLoadableFallback<CheckboxProps>(import('./Checkbox/Checkbox'), {
  fallback: { height: '10rem' }
})
const Navigation = withLoadableFallback<NavigationProps>(import('./Navigation/Navigation'), {
  fallback: { height: '10rem' }
})
const Dropdown = withLoadableFallback<DropdownProps>(import('./Dropdown/Dropdown'), {
  fallback: { height: '10rem' }
})
const Alert = withLoadableFallback<AlertProps>(import('./Alert/Alert'), {
  fallback: { height: '10rem' }
})
const Loader = withLoadableFallback<LoaderProps>(import('./Loader/Loader'), {
  fallback: { height: '10rem' }
})
const Pagination = withLoadableFallback<PaginationProps>(import('./Pagination/Pagination'), {
  fallback: { height: '10rem' }
})
const ValidationErrorMessage = withLoadableFallback<ValidationErrorMessageProps>(
  import('./ValidationErrorMessage/ValidationErrorMessage'),
  {
    fallback: { height: '10rem' }
  }
)
const Fallback = withLoadableFallback<FallbackProps>(import('./Fallback/Fallback'), {
  fallback: { height: '10rem' }
})

export {
  Button,
  Image,
  Link,
  Input,
  Checkbox,
  Navigation,
  Dropdown,
  Alert,
  Loader,
  Pagination,
  ValidationErrorMessage,
  Fallback
}

export type {
  ButtonProps,
  ButtonEvents,
  ImageProps,
  LinkProps,
  InputProps,
  InputSuffixProp,
  CheckboxProps,
  NavigationProps,
  DropdownProps,
  AlertProps,
  LoaderProps,
  PaginationProps,
  ValidationErrorMessageProps,
  FallbackProps
}
