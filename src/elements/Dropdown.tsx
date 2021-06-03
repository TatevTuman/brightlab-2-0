import React, { Fragment, memo, useRef } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Children, OptionType } from '~types'
import { useOutsideClick } from '~hooks'

type DropdownProps = {
  show: boolean
  children: Children
  options?: OptionType[]
  groups?: { title?: string; options: OptionType[] }[]
  onShow: () => void
  onHide: () => void
}

const Dropdown: React.FC<DropdownProps> = props => {
  const { show, options, groups, children, onShow, onHide } = props

  const isOptions = options && options.length
  const isGroupedOptions = groups && groups.length

  const renderMenuGroupedOptions = () => {
    if (!isGroupedOptions) return null

    return (
      <Menu.Items
        static
        className="w-full max-h-200 overflow-y-scroll absolute left-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-6 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {groups!.map((group, index) => {
          const { title, options } = group

          return (
            <div key={index} className="px-1 py-1">
              {title && <h6>{title}</h6>}
              {options.map(option => {
                const { label, value } = option

                return (
                  <Menu.Item key={value}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-14`}
                      >
                        {label}
                      </button>
                    )}
                  </Menu.Item>
                )
              })}
            </div>
          )
        })}
      </Menu.Items>
    )
  }

  const renderMenuOptions = () => {
    if (!isOptions) return null

    return (
      <Menu.Items
        static
        className="w-full max-h-200 overflow-y-scroll absolute left-0 mt-2 origin-top-right bg-white rounded-6 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {options!.map(option => {
          const { label, value } = option

          return (
            <Menu.Item key={value}>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-14`}
                >
                  {label}
                </button>
              )}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    )
  }

  const render = () => {
    if (isGroupedOptions) return renderMenuGroupedOptions()
    else if (isOptions) return renderMenuOptions()
    else return 'No options supplied'
  }

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, onHide)

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <Menu as={Fragment}>
        {({ open }) => (
          <>
            <div className="inline-flex justify-center cursor-pointer" onClick={onShow}>
              {children}
            </div>
            <Transition
              as={'div'}
              show={show}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-90"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-90"
            >
              {render()}
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

export default memo(Dropdown)
