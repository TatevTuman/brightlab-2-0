import React, { Fragment, memo, forwardRef, useRef, RefObject, useEffect } from 'react'
import cls from 'classnames'
import { Menu as MenuComponent, Transition } from '@headlessui/react'
import { Children, ClassName, OptionType } from '~types'
import { useClickAway } from '~hooks'

interface MenuItemProps {
  option: OptionType
}

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const { label, value } = props.option

  return (
    <MenuComponent.Item key={value}>
      {({ active }) => (
        <button
          className={cls(
            'group flex rounded-md items-center w-full px-2 py-2 text-14',
            { 'bg-violet-500 text-white': active },
            { 'text-gray-900': !active }
          )}
        >
          {label}
        </button>
      )}
    </MenuComponent.Item>
  )
})

MenuItem.displayName = 'MenuItem'

interface MenuItemsProps {
  show: boolean
  options?: OptionType[]
  groups?: { title?: string; options: OptionType[] }[]
}

const MenuItems = forwardRef<HTMLDivElement, MenuItemsProps>((props, ref) => {
  const { show, options, groups } = props

  const isOptions = options && options.length
  const isGroupedOptions = groups && groups.length

  if (!isOptions && !isGroupedOptions) return <div ref={ref}>No options supplied</div>

  return (
    <MenuComponent.Items
      ref={ref}
      static
      className={cls(
        'w-full max-h-200 overflow-y-scroll absolute left-0 mt-2 origin-top-right bg-white rounded-6 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
        { 'divide-y divide-gray-100': isGroupedOptions },
        { 'z-1': show }
      )}
    >
      {isOptions &&
        options!.map((option, index) => {
          const { value } = option

          return <MenuItem key={value + index} option={option} />
        })}
      {isGroupedOptions &&
        groups!.map((group, index) => {
          const { title, options } = group

          return (
            <div key={index} className="px-1 py-1">
              {title && <h6>{title}</h6>}
              {options.map(option => {
                const { value } = option

                return <MenuItem key={value + index} option={option} />
              })}
            </div>
          )
        })}
    </MenuComponent.Items>
  )
})

MenuItems.displayName = 'MenuItems'

interface MenuProps {
  className?: ClassName
  show: boolean
  children: Children
  options?: OptionType[]
  groups?: { title?: string; options: OptionType[] }[]
  onShow: (value: boolean) => void
  onHide: (value: boolean) => void
}

const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const { className, show, options, groups, children, onShow, onHide } = props

  const innerRef = ref || useRef<HTMLDivElement>(null)
  useClickAway(innerRef as RefObject<HTMLDivElement>, () => onHide(false))

  return (
    <div className={`relative inline-block text-left ${className}`} ref={innerRef}>
      <MenuComponent as={Fragment}>
        {({ open }) => (
          <>
            <div className="inline-flex justify-center cursor-pointer" onClick={() => onShow(!show)}>
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
              <MenuItems show={show} options={options} groups={groups} />
            </Transition>
          </>
        )}
      </MenuComponent>
    </div>
  )
})

Menu.displayName = 'Menu'

export default memo(Menu)
