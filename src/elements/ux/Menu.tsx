import React, { Fragment, memo, forwardRef, useRef, RefObject } from 'react'
import cls from 'classnames'
import { Menu as MenuComponent, Transition } from '@headlessui/react'
import { Children, ClassName, OptionType } from '~types'
import { useClickAway } from '~hooks'

export interface MenuItemProps {
  option: OptionType
  onOptionClick?: (option: OptionType) => void
}

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const { onOptionClick } = props
  const { label, value } = props.option

  return (
    <MenuComponent.Item key={value} onClick={() => onOptionClick && onOptionClick(props.option)}>
      {({ active }) => (
        <button
          className={cls(
            'w-full text-left text-14 cursor-pointer select-none relative transition-colors text-neutral-1 hover:bg-neutral-7 focus:bg-neutral-7 transition-transform transform hover:-translate-y-2 focus:-translate-y-2 whitespace-nowrap',
            {
              'bg-neutral-7': active
            }
          )}
        >
          {label}
        </button>
      )}
    </MenuComponent.Item>
  )
})

MenuItem.displayName = 'MenuItem'

export interface MenuItemsProps {
  show: boolean
  options?: OptionType[]
  groups?: { title?: string; options: OptionType[] }[]
  onOptionRender?: (option: OptionType, index: number) => Children
  onOptionClick?: (option: OptionType) => void
}

const MenuItems = forwardRef<HTMLDivElement, MenuItemsProps>((props, ref) => {
  const { show, options, groups, onOptionRender, onOptionClick } = props

  const isOptions = options && options.length
  const isGroupedOptions = groups && groups.length

  if (!isOptions && !isGroupedOptions) {
    return (
      <div className={'pointer-events-none'}>
        <MenuItem option={{ label: 'No results', value: '' }} />
      </div>
    )
  }

  return (
    <MenuComponent.Items
      ref={ref}
      static
      className={cls(
        'absolute right-0 w-fit mt-1 p-10 rounded-8 bg-neutral-13 border border-neutral-9 shadow-drop',
        { 'z-1': show },
        { 'divide-y divide-gray-100': isGroupedOptions }
      )}
    >
      {isOptions &&
        options!.map((option, index) => {
          const { value } = option

          if (onOptionRender) {
            return onOptionRender(option, index)
          }

          return <MenuItem key={value + index} option={option} onOptionClick={onOptionClick} />
        })}
      {isGroupedOptions &&
        groups!.map((group, index) => {
          const { title, options } = group

          return (
            <div key={index} className="px-1 py-1">
              {title && <h6>{title}</h6>}
              {options.map(option => {
                const { value } = option

                if (onOptionRender) {
                  return onOptionRender(option, index)
                }

                return <MenuItem key={value + index} option={option} onOptionClick={onOptionClick} />
              })}
            </div>
          )
        })}
    </MenuComponent.Items>
  )
})

MenuItems.displayName = 'MenuItems'

export interface MenuProps {
  className?: ClassName
  show: boolean
  children: Children
  options?: OptionType[]
  groups?: { title?: string; options: OptionType[] }[]
  onOptionRender?: (option: OptionType, index: number) => Children
  onOptionClick?: (option: OptionType) => void
  onShow: (value: boolean) => void
  onHide: (value: boolean) => void
}

const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const { className, show, options, groups, children, onOptionRender, onOptionClick, onShow, onHide } = props

  const innerRef = ref || useRef<HTMLDivElement>(null)
  useClickAway(innerRef as RefObject<HTMLDivElement>, () => onHide(false))

  return (
    <div className={`relative mt-1 w-fit inline-block text-left ${className}`} ref={innerRef}>
      <MenuComponent as={Fragment}>
        {({ open }) => (
          <>
            <div className="relative w-fit text-left rounded-8 cursor-pointer" onClick={() => onShow(!show)}>
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
              <MenuItems show={show} options={options} groups={groups} onOptionClick={onOptionClick} onOptionRender={onOptionRender} />
            </Transition>
          </>
        )}
      </MenuComponent>
    </div>
  )
})

Menu.displayName = 'Menu'

export default memo(Menu)
