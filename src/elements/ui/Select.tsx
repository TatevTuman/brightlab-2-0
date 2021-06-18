import React, { forwardRef, memo, useState } from 'react'
import { TextInput, TextInputProps } from '~ui'
import { ListBox } from '~ux'
import { ClassName, OptionType } from '~types'

export interface SelectProps {
  className?: ClassName
  name: string
  value: string
  options: OptionType[]
  onChange: (value: string) => void
  textInput: Omit<TextInputProps, 'name' | 'value' | 'onChange' | 'onClick'>
}

const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const { className, name, value, options, onChange, textInput } = props

  const [show, onShow] = useState(false)
  const [textInputValue, setTextInputValue] = useState('')

  const handleListBoxChange = (value: string) => {
    setTextInputValue(value)
    onChange(value)
  }

  return (
    <ListBox
      className={className}
      show={show}
      value={value}
      options={options}
      onChange={handleListBoxChange}
      onShow={onShow}
      onHide={onShow}
    >
      <TextInput name={name} value={textInputValue} variant={'green'} onChange={() => null} {...textInput} />
    </ListBox>
  )
})

Select.displayName = 'Select'

export default memo(Select)
