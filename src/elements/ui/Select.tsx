import React, { forwardRef, memo, useEffect, useState } from 'react'
import { TextInput, TextInputProps } from '~ui'
import { ListBox } from '~ux'
import { ClassName, OptionType } from '~types'

export interface SelectProps {
  className?: ClassName
  name: string
  value: string
  options: OptionType[]
  onChange: (value: string) => void
  textInputProps?: Omit<TextInputProps, 'name' | 'value' | 'onChange'>
}

const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const { className, name, value, options, onChange, textInputProps } = props

  const [show, onShow] = useState(false)
  const [textInputValue, setTextInputValue] = useState<string>()

  useEffect(() => {
    const option = options.find(option => option.value === value)

    if (option) {
      setTextInputValue(option.label)
    }
  }, [])

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
      options={options}
      onChange={v => handleListBoxChange(v as string)}
      onHide={onShow}
    >
      <TextInput
        className={{ ring: show }}
        name={name}
        ref={ref}
        value={textInputValue}
        variant={'primary'}
        tabIndex={0}
        onChange={() => null}
        onFocus={() => onShow(true)}
        onBlur={() => setTimeout(() => onShow(false), 150)}
        autoComplete={'off'}
        placeholder={'Select an option...'}
        {...textInputProps}
      />
    </ListBox>
  )
})

Select.displayName = 'Select'

export default memo(Select)
