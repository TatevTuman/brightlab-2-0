import React, { Fragment, memo, forwardRef, useRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import Class from 'classnames'
import { Children, OptionType } from '~types'
import { useOutsideClick } from '~hooks'

interface SelectOptionProps {
  option: OptionType
}

const SelectOption = forwardRef<HTMLLIElement, SelectOptionProps>((props, ref) => {
  const { label, value } = props.option

  return (
    <Listbox.Option
      ref={ref}
      key={value}
      className={({ active }) =>
        Class(
          'cursor-default select-none relative py-2 pl-10 pr-4',
          { 'text-green-900 bg-green-100': active },
          { 'text-orange-900': !active }
        )
      }
      value={value}
    >
      {({ selected, active }) => (
        <>
          <span className={Class('block truncate', { 'font-medium': selected }, { 'font-normal': !selected })}>
            {label}
          </span>
          {selected && (
            <span className={Class('absolute inset-y-0 left-0 flex items-center pl-3', { 'text-green-600': active })}>
              <CheckIcon className="w-10 h-10" aria-hidden="true" />
            </span>
          )}
        </>
      )}
    </Listbox.Option>
  )
})

SelectOption.displayName = 'SelectOption'

interface SelectOptionsProps {
  show: boolean
  options: OptionType[]
}

const SelectOptions = forwardRef<HTMLUListElement, SelectOptionsProps>((props, ref) => {
  const { show, options } = props

  return (
    <Listbox.Options
      ref={ref}
      static
      className={Class(
        'absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none',
        { 'z-1': show }
      )}
    >
      {options.map((option, index) => {
        return <SelectOption key={option.value + index} option={option} />
      })}
    </Listbox.Options>
  )
})

SelectOptions.displayName = 'SelectOptions'

interface SelectProps {
  className?: string
  show: boolean
  children: ((value: OptionType | null) => Children) | Children
  options: OptionType[]
  selected: OptionType | null
  onSelect: (option: OptionType) => void
  onShow: (value: boolean) => void
  onHide: (value: boolean) => void
}

const Select: React.FC<SelectProps> = props => {
  const { className, show, children, options, selected, onSelect, onShow, onHide } = props

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => onHide(false))

  return (
    <div className={className} ref={ref}>
      <Listbox value={selected} onChange={onSelect}>
        <div className="relative mt-1">
          <div
            className="relative w-full text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500"
            onClick={() => onShow(true)}
          >
            {typeof children === 'function' ? children(selected) : children}
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
            <SelectOptions show={show} options={options} />
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default memo(Select)
