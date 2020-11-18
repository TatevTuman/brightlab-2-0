import loadable, { LoadableComponent } from '@loadable/component'

import { ButtonProps } from './Button/Button'
import { ImageProps } from './Image/Image'
import { LinkProps } from './Link/Link'
import { InputProps } from './Input/Input'
import { CheckboxProps } from './Checkbox/Checkbox'

export const Button: LoadableComponent<ButtonProps> = loadable(() => import('./Button/Button'))
export const Image: LoadableComponent<ImageProps> = loadable(() => import('./Image/Image'))
export const Link: LoadableComponent<LinkProps> = loadable(() => import('./Link/Link'))
export const Input: LoadableComponent<InputProps> = loadable(() => import('./Input/Input'))
export const Checkbox: LoadableComponent<CheckboxProps> = loadable(() => import('./Checkbox/Checkbox'))
