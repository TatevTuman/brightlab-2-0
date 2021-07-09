import React, { Fragment, memo, forwardRef, useRef, RefObject } from 'react'
import { Listbox as ListBoxComponent, Transition } from '@headlessui/react'
import cls from 'classnames'
import { Children, ClassName, OptionType } from '~types'
import { useClickAway } from '~hooks'

export interface ListBoxOptionProps {
  option: OptionType
  selected: boolean
  Option?: (option: OptionType) => Children
}

const ListBoxOption = forwardRef<HTMLLIElement, ListBoxOptionProps>((props, ref) => {
  const {
    option: { label, value },
    selected,
    Option
  } = props

  return (
    <ListBoxComponent.Option
      ref={ref}
      key={value}
      className={({ active }) =>
        cls(
          'cursor-pointer select-none relative px-16 py-9 transition-colors text-white hover:bg-neutral-7 focus:bg-neutral-7 transition-transform transform hover:-translate-y-2 focus:-translate-y-2',
          {
            'bg-neutral-7': active
          }
        )
      }
      value={value}
    >
      {Option ? Option({ label, value }) : <small className={cls('block h-18')}>{label}</small>}
    </ListBoxComponent.Option>
  )
})

ListBoxOption.displayName = 'ListBoxOption'

export interface ListBoxOptionsProps {
  show: boolean
  options: OptionType[]
  value: string[] | string | null
  Option?: (option: OptionType) => Children
}

const ListBoxOptions = forwardRef<HTMLUListElement, ListBoxOptionsProps>((props, ref) => {
  const { show, options, value, Option } = props

  return (
    <ListBoxComponent.Options
      ref={ref}
      static
      className={cls(
        'absolute w-full mt-1 pt-4 overflow-auto rounded-8 max-h-120 bg-neutral-13 border border-neutral-9 shadow-drop',
        { 'z-1': show }
      )}
    >
      {options.length > 0 ? (
        options.map((option, index) => {
          const selected = Array.isArray(value) ? !!value.find(v => v === option.value) : value === option.value
          return <ListBoxOption key={option.value + index} option={option} selected={selected} Option={Option} />
        })
      ) : (
        <div className={'pointer-events-none'}>
          <ListBoxOption option={{ label: 'No results', value: '' }} selected={false} />
        </div>
      )}
    </ListBoxComponent.Options>
  )
})

ListBoxOptions.displayName = 'ListBoxOptions'

export interface ListBoxProps {
  className?: ClassName
  children: ((value: string[] | string | null) => Children) | Children
  show: boolean
  value: string[] | string | null
  options: OptionType[]
  onChange: (value: string[] | string) => void
  onHide: (value: boolean) => void
  Option?: (option: OptionType) => Children
}

const ListBox = forwardRef<HTMLDivElement, ListBoxProps>((props, ref) => {
  const { className, show, children, options, Option, value, onChange, onHide } = props

  const innerRef = ref || useRef<HTMLDivElement>(null)
  useClickAway(innerRef as RefObject<HTMLDivElement>, () => onHide(false))

  const handleChange = (optionValue: string) => {
    const isMulti = Array.isArray(value)

    if (isMulti) {
      const isAlreadySelected = (value as string[]).find(v => v === optionValue)

      if (isAlreadySelected) {
        onChange((value as string[]).filter(v => v !== optionValue))
      } else {
        onChange([...(value as string[]), optionValue])
      }
    } else {
      onChange(optionValue)
    }
  }

  return (
    <ListBoxComponent value={value} onChange={handleChange}>
      <div className={cls(className, 'relative mt-1')} ref={innerRef}>
        <div className="w-full relative text-left rounded-8 cursor-pointer">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore TODO  */}
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
          <ListBoxOptions show={show} options={options} value={value} Option={Option} />
        </Transition>
      </div>
    </ListBoxComponent>
  )
})

ListBox.displayName = 'ListBox'

export default memo(ListBox)
