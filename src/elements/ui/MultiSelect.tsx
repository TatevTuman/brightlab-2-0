import React, { forwardRef, memo, useEffect, useState } from 'react'
import { TextInput, TextInputProps } from '~ui'
import { ListBox } from '~ux'
import { Children, ClassName, OptionType } from '~types'

export interface MultiSelectProps {
  className?: ClassName
  name: string
  value: string[]
  options: OptionType[]
  onChange: (value: string[]) => void
  onOptionRender: (props: { onOptionRemove: (value: string) => void }, option: OptionType) => Children
  textInputProps?: Omit<TextInputProps, 'name' | 'value' | 'onChange' | 'onClick' | 'prefixes'>
}

const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>((props, ref) => {
  const { className, name, value, options, onChange, onOptionRender, textInputProps } = props

  const [show, onShow] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([])
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [autocompletedOptions, setAutocompletedOptions] = useState(options)
  const [textInputValue, setTextInputValue] = useState('')

  const filterOptionsEffect = () =>
    setFilteredOptions(
      options.filter(option => !selectedOptions.find(selectedOption => option.value === selectedOption.value))
    )

  const autocompleteOptionsEffect = () =>
    setAutocompletedOptions(filteredOptions.filter(option => option.label.includes(textInputValue)))

  useEffect(filterOptionsEffect, [selectedOptions])
  useEffect(autocompleteOptionsEffect, [textInputValue, filteredOptions])

  const handleOptionRemove = (optionValue: string) => {
    const nextValue = value.filter(v => v !== optionValue)
    handleListBoxChange(nextValue)
  }
  const handleTextInputChange = (value: string) => setTextInputValue(value)
  const handleListBoxChange = (value: string[]) => {
    const selectedOptions = options.filter(option => value.find(v => option.value === v))

    if (selectedOptions.length) {
      setTextInputValue('')
      onChange(value)
      setSelectedOptions(selectedOptions)
    } else {
      setTextInputValue('')
      onChange([])
      setSelectedOptions([])
    }
  }

  return (
    <ListBox
      className={className}
      show={show}
      value={value}
      options={autocompletedOptions}
      onChange={v => handleListBoxChange(v as string[])}
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
        autoComplete={'off'}
        prefix={
          <div className={'inline-flex flex-wrap'}>
            {selectedOptions.map(option => onOptionRender({ onOptionRemove: handleOptionRemove }, option))}
          </div>
        }
        {...textInputProps}
      />
    </ListBox>
  )
})

MultiSelect.displayName = 'MultiSelect'

export default memo(MultiSelect)
