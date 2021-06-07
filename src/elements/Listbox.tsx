import React, { Fragment, memo, forwardRef, useRef, RefObject } from 'react'
import { Listbox as ListBoxComponent, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import cls from 'classnames'
import { Children, OptionType } from '~types'
import { useOutsideClick } from '~hooks'

interface ListBoxOptionProps {
  option: OptionType
}

const ListBoxOption = forwardRef<HTMLLIElement, ListBoxOptionProps>((props, ref) => {
  const { label, value } = props.option

  return (
    <ListBoxComponent.Option
      ref={ref}
      key={value}
      className={({ active }) =>
        cls(
          'cursor-default select-none relative py-2 pl-10 pr-4',
          { 'text-green-900 bg-green-100': active },
          { 'text-orange-900': !active }
        )
      }
      value={value}
    >
      {({ selected, active }) => (
        <>
          <span className={cls('block truncate', { 'font-medium': selected }, { 'font-normal': !selected })}>
            {label}
          </span>
          {selected && (
            <span className={cls('absolute inset-y-0 left-0 flex items-center pl-3', { 'text-green-600': active })}>
              <CheckIcon className="w-10 h-10" aria-hidden="true" />
            </span>
          )}
        </>
      )}
    </ListBoxComponent.Option>
  )
})

ListBoxOption.displayName = 'ListBoxOption'

interface ListBoxOptionsProps {
  show: boolean
  options: OptionType[]
}

const ListBoxOptions = forwardRef<HTMLUListElement, ListBoxOptionsProps>((props, ref) => {
  const { show, options } = props

  return (
    <ListBoxComponent.Options
      ref={ref}
      static
      className={cls(
        'absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none',
        { 'z-1': show }
      )}
    >
      {options.map((option, index) => {
        return <ListBoxOption key={option.value + index} option={option} />
      })}
    </ListBoxComponent.Options>
  )
})

ListBoxOptions.displayName = 'ListBoxOptions'

interface ListBoxProps {
  className?: string
  children: ((value: OptionType | null) => Children) | Children
  show: boolean
  value: OptionType | null
  options: OptionType[]
  onChange: (option: OptionType) => void
  onShow: (value: boolean) => void
  onHide: (value: boolean) => void
}

const ListBox = forwardRef<HTMLDivElement, ListBoxProps>((props, ref) => {
  const { className, show, children, options, value, onChange, onShow, onHide } = props

  const innerRef = ref || useRef<HTMLDivElement>(null)
  useOutsideClick(innerRef as RefObject<HTMLDivElement>, () => onHide(false))

  return (
    <div className={className} ref={ref}>
      <ListBoxComponent value={value} onChange={onChange}>
        <div className="relative mt-1">
          <div
            className="relative w-full text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500"
            onClick={() => onShow(true)}
          >
            {typeof children === 'function' ? children(value) : children}
          </div>
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
            <ListBoxOptions show={show} options={options} />
          </Transition>
        </div>
      </ListBoxComponent>
    </div>
  )
})

ListBox.displayName = 'ListBox'

export default memo(ListBox)
