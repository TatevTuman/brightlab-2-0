import React from 'react'
import loadable, { DefaultComponent, OptionsWithResolver } from '@loadable/component'
import { Fallback, FallbackProps } from '@elements'
import { timeout as pMinTimeout } from 'promise-timeout'
import pMinDelay from 'p-min-delay'

export type WithLoadableFallbackOptions = {
  delay?: number
  timeout?: number
  fallback?: FallbackProps
}

const defaultOptions = { delay: 1000, timeout: 10000, fallback: { height: '20rem' } }

export default <Props, Module extends DefaultComponent<Props> = DefaultComponent<Props>>(
  moduleImport: PromiseLike<Module>,
  options?: WithLoadableFallbackOptions,
  loadableOptions?: OptionsWithResolver<Props, Module>
) => {
  const propsOptions = { ...defaultOptions, ...options }
  const { delay, timeout, fallback } = propsOptions

  const delayedHandler = pMinDelay(moduleImport, delay)
  const timeoutHandler = pMinTimeout(delayedHandler, timeout)

  return loadable<Props>(() => timeoutHandler, { fallback: <Fallback {...fallback} />, ...loadableOptions })
}
