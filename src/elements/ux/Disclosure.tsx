import React, { memo, forwardRef, Fragment } from 'react'
import cls from 'classnames'
import { Disclosure as DisclosureComponent, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { Children, ClassName } from '~types'

interface DisclosureProps {
  className?: ClassName
  title: Children
  description: Children
  defaultOpen?: boolean
}

const Disclosure: React.FC<DisclosureProps> = forwardRef<HTMLInputElement, DisclosureProps>((props, ref) => {
  const { className, title, description, defaultOpen } = props

  return (
    <DisclosureComponent as={'div'} className={cls(className)} defaultOpen={defaultOpen} ref={ref}>
      {({ open }) => {
        return (
          <>
            <DisclosureComponent.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-green-900 bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
              <span>{title}</span>
              <ChevronUpIcon className={cls('w-20 h-20 text-green-500', { 'transform rotate-180': open })} />
            </DisclosureComponent.Button>
            <Transition
              as={Fragment}
              show={open}
              enter="transition ease-out duration-150"
              enterFrom="transform opacity-0 translate-y-5"
              enterTo="transform opacity-100 translate-y-0"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 translate-y-0"
              leaveTo="transform opacity-0 translate-y-5"
            >
              <DisclosureComponent.Panel className="px-4 pt-4 pb-2 text-gray-500">
                {description}
              </DisclosureComponent.Panel>
            </Transition>
          </>
        )
      }}
    </DisclosureComponent>
  )
})

Disclosure.displayName = 'Disclosure'

export default memo(Disclosure)
