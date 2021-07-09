import React, { forwardRef, memo, useEffect, useState } from 'react'
import { TextInput, TextInputProps } from '~ui'
import { ListBox } from '~ux'
import { ClassName, OptionType } from '~types'

export interface AutocompleteProps {
  className?: ClassName
  name: string
  value: string
  options: OptionType[]
  onChange: (value: string) => void
  textInputProps?: Omit<TextInputProps, 'name' | 'value' | 'onChange' | 'onClick'>
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>((props, ref) => {
  const { className, name, value, options, onChange, textInputProps } = props
  const defaultSelectedOption = options.find(option => option.value === value)

  const [show, onShow] = useState(false)
  const [autocompletedOptions, setAutocompletedOptions] = useState(options)
  const [textInputValue, setTextInputValue] = useState(defaultSelectedOption?.label || '')

  const filterOptionsEffect = () =>
    setAutocompletedOptions(options.filter(({ label }) => label.toLowerCase().includes(textInputValue.toLowerCase())))
  useEffect(filterOptionsEffect, [textInputValue])

  const handleTextInputChange = (value: string) => {
    setTextInputValue(value)
    onChange('')
  }
  const handleListBoxChange = (value: string) => {
    const option = options.find(option => option.value === value)

    if (option) {
      setTextInputValue(option.label)
      onChange(value)
    } else {
      setTextInputValue('')
      onChange('')
    }
  }

  return (
    <ListBox
      className={className}
      show={show}
      value={value}
      options={autocompletedOptions}
      onChange={v => handleListBoxChange(v as string)}
      onHide={onShow}
    >
      <TextInput
        className={{ ring: show }}
        name={name}
        value={textInputValue}
        variant={'primary'}
        placeholder={'Start typing...'}
        tabIndex={0}
        onChange={({ currentTarget: { value } }) => handleTextInputChange(value)}
        onFocus={() => onShow(true)}
        onBlur={() => setTimeout(() => onShow(false), 150)}
        autoComplete={'off'}
        {...textInputProps}
      />
    </ListBox>
  )
})

Autocomplete.displayName = 'Autocomplete'

export default memo(Autocomplete)
