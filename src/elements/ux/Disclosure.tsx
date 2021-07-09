import React, { memo, forwardRef, Fragment } from 'react'
import cls from 'classnames'
import { Disclosure as DisclosureComponent, Transition } from '@headlessui/react'
import { Children, ClassName } from '~types'
import { PlusChipVariantType } from '~ui'

export type DisclosureVariantType = 'primary'

const disclosureBaseVariant = ''

const getDisclosureVariantClass = (variant: PlusChipVariantType, className?: ClassName) =>
  cls(className, disclosureBaseVariant)

export interface DisclosureProps {
  className?: ClassName
  variant?: DisclosureVariantType
  show: boolean
  panel: Children
  children: Children
}

const Disclosure: React.FC<DisclosureProps> = forwardRef<HTMLInputElement, DisclosureProps>((props, ref) => {
  const { className, variant = 'primary', show, panel, children } = props

  return (
    <DisclosureComponent as={'div'} className={getDisclosureVariantClass(variant, className)} ref={ref}>
      {({ open }) => {
        return (
          <>
            <DisclosureComponent.Button as={Fragment}>{children}</DisclosureComponent.Button>
            <Transition
              as={Fragment}
              show={show}
              enter="transition ease-out duration-150"
              enterFrom="transform opacity-0 translate-y-5"
              enterTo="transform opacity-100 translate-y-0"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 translate-y-0"
              leaveTo="transform opacity-0 translate-y-5"
            >
              <DisclosureComponent.Panel className="px-4 pt-4 pb-2 text-gray-500">{panel}</DisclosureComponent.Panel>
            </Transition>
          </>
        )
      }}
    </DisclosureComponent>
  )
})

Disclosure.displayName = 'Disclosure'

export default memo(Disclosure)
